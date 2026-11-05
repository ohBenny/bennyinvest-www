import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { createServer } from 'node:net';

const payload = { name: 'Test & Firma', email: 'test@example.com', area: 'Szczecin', timing: '', budget: 'Do ustalenia', brief: 'Strona WWW i promocja.', website: '', services: ['Strony WWW i obsługa'] };
async function startPhp(directory, sendmail) {
  const socket = createServer();
  await new Promise(resolve => socket.listen(0, '127.0.0.1', resolve));
  const port = socket.address().port;
  await new Promise(resolve => socket.close(resolve));
  const child = spawn(process.env.PHP_BIN || 'php', ['-n', '-d', `sys_temp_dir=${directory}`, '-d', `sendmail_path=${sendmail}`, '-S', `127.0.0.1:${port}`, '-t', resolve('dist')]);
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('PHP server startup timed out')), 10000);
    child.once('error', error => { clearTimeout(timer); reject(error); });
    child.once('exit', code => { clearTimeout(timer); reject(new Error(`PHP exited: ${code}`)); });
    child.stderr.on('data', data => { if (String(data).includes('Development Server')) { clearTimeout(timer); resolve(); } });
  });
  return { child, origin: `http://127.0.0.1:${port}` };
}

test('quote endpoint validates input, captures mail, throttles requests and reports transport errors', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'benny-mail-test-'));
  const capture = join(directory, 'sendmail');
  const mailLog = join(directory, 'mail.txt');
  await writeFile(capture, `#!/bin/sh\ncat >> '${mailLog}'\n`, { mode: 0o700 });
  const server = await startPhp(directory, capture);
  let failure;
  const post = (data, headers = {}) => fetch(`${server.origin}/api/quote.php`, { method: 'POST', headers: { Origin: server.origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
  try {
    assert.equal((await fetch(`${server.origin}/api/quote.php`)).status, 405);
    assert.equal((await post(payload, { Origin: 'https://other.example' })).status, 403);
    assert.equal((await post(payload, { 'Content-Type': 'text/plain' })).status, 415);
    for (const invalid of [{ email: '' }, { email: 'invalid' }, { email: 'test@example.com\r\nBcc: other@example.com' }, { name: '' }, { area: '' }, { brief: '' }, { services: [] }, { services: ['Unknown'] }, { website: 'spam' }, { brief: 'x'.repeat(9000) }]) {
      assert.equal((await post({ ...payload, ...invalid })).status, 422);
    }
    assert.equal((await post({ ...payload, brief: 'x'.repeat(17000) })).status, 413);
    const first = await post(payload);
    assert.equal(first.status, 200);
    assert.equal((await first.json()).ok, true);
    const mail = await readFile(mailLog, 'utf8');
    assert.match(mail, /To: biuro@bennyinvest.pl/);
    assert.match(mail, /Reply-To: test@example.com/);
    assert.match(mail, /Strony WWW i obsługa/);
    assert.match(mail, /Test & Firma/);
    assert.equal((await post(payload)).status, 200);
    assert.equal((await post(payload)).status, 200);
    const limited = await post(payload);
    assert.equal(limited.status, 429);
    assert.equal(limited.headers.get('retry-after'), '600');
    const failureDir = join(directory, 'failure');
    await import('node:fs/promises').then(fs => fs.mkdir(failureDir));
    failure = await startPhp(failureDir, '/bin/false');
    const failed = await fetch(`${failure.origin}/api/quote.php`, { method: 'POST', headers: { Origin: failure.origin, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    assert.equal(failed.status, 503);
    assert.equal((await failed.json()).ok, false);
  } finally {
    server.child.kill();
    failure?.child.kill();
    await rm(directory, { recursive: true, force: true });
  }
});
