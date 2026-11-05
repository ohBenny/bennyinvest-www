<?php
declare(strict_types=1);

// Requires PHP 8.1+ and hosting mail transport. No SMTP credentials in this file.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $status, string $message): never {
    http_response_code($status);
    echo json_encode(['ok' => $status === 200, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'Użyj formularza wyceny.');
}
// Browsers must submit JSON from this origin; no cross-origin access is enabled.
$origin = parse_url($_SERVER['HTTP_ORIGIN'] ?? '');
$host = parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''));
if (!is_array($origin) || !isset($origin['host']) ||
    strtolower($origin['host']) !== strtolower($host['host'] ?? '') ||
    ($origin['port'] ?? (($origin['scheme'] ?? '') === 'https' ? 443 : 80)) !==
    ($host['port'] ?? ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 443 : 80))) {
    respond(403, 'Wyślij zapytanie z formularza na naszej stronie.');
}
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== 0) respond(415, 'Nieprawidłowy format zapytania.');
$raw = file_get_contents('php://input', false, null, 0, 16001);
if ($raw === false || strlen($raw) > 16000) respond(413, 'Zapytanie jest zbyt długie.');
$data = json_decode($raw, true);
if (!is_array($data)) respond(400, 'Nieprawidłowe zapytanie.');
foreach (['name' => 480, 'email' => 180, 'area' => 640, 'timing' => 480, 'budget' => 120, 'brief' => 8000, 'website' => 400] as $key => $limit) {
    if (!isset($data[$key]) || !is_string($data[$key]) || strlen($data[$key]) > $limit || preg_match('//u', $data[$key]) !== 1) respond(422, 'Sprawdź pola formularza.');
    $data[$key] = trim($data[$key]);
}
if ($data['website'] !== '') respond(422, 'Nie udało się wysłać zapytania. Skontaktuj się z nami e-mailem.');
if ($data['name'] === '' || $data['area'] === '' || $data['brief'] === '' ||
    !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $data['email'])) {
    respond(422, 'Uzupełnij imię lub firmę, poprawny e-mail, obszar oraz opis kampanii.');
}
$allowed = ['Kolportaż materiałów', 'Reklama w taxi', 'Meta Ads', 'Google Ads', 'Akcje promocyjne', 'Strony WWW i obsługa', 'Potrzebuję doradztwa'];
if (!isset($data['services']) || !is_array($data['services']) || count($data['services']) < 1 || count($data['services']) > count($allowed)) respond(422, 'Wybierz usługę.');
foreach ($data['services'] as $service) if (!is_string($service) || !in_array($service, $allowed, true)) respond(422, 'Wybierz usługę z listy.');

// One shared file prevents unbounded per-IP files. Store only hashed addresses and timestamps.
$ratePath = sys_get_temp_dir() . '/benny-quote-' . hash('sha256', __DIR__) . '.json';
$rateFile = fopen($ratePath, 'c+');
if ($rateFile === false || !flock($rateFile, LOCK_EX)) respond(503, 'Formularz jest chwilowo niedostępny. Napisz do nas bezpośrednio.');
chmod($ratePath, 0600);
$rates = json_decode(stream_get_contents($rateFile), true) ?: [];
$now = time();
foreach ($rates as $ip => $times) {
    $rates[$ip] = array_values(array_filter($times, fn($time) => $time > $now - 600));
    if (!$rates[$ip]) unset($rates[$ip]);
}
$ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . __DIR__);
if (count($rates[$ip] ?? []) >= 3 || (!isset($rates[$ip]) && count($rates) >= 2000)) {
    flock($rateFile, LOCK_UN); fclose($rateFile);
    header('Retry-After: 600'); respond(429, 'Zbyt wiele prób. Spróbuj za 10 minut lub zadzwoń: +48 576 243 368.');
}
$rates[$ip][] = $now;
ftruncate($rateFile, 0); rewind($rateFile);
$written = fwrite($rateFile, json_encode($rates));
fflush($rateFile); flock($rateFile, LOCK_UN); fclose($rateFile);
if ($written === false) respond(503, 'Formularz jest chwilowo niedostępny.');

$body = implode("\n", [
    'Zapytanie o wycenę kampanii', '',
    'Imię / firma: ' . $data['name'], 'E-mail: ' . $data['email'],
    'Usługi: ' . implode(', ', $data['services']), 'Obszar: ' . $data['area'],
    'Termin: ' . ($data['timing'] ?: 'Do ustalenia'), 'Budżet: ' . $data['budget'],
    '', 'Opis i cel:', $data['brief'],
]);
$headers = [
    'From' => 'Benny Invest <biuro@bennyinvest.pl>',
    'Reply-To' => $data['email'],
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
];
try {
    $sent = mail('biuro@bennyinvest.pl', '=?UTF-8?B?' . base64_encode('Zapytanie o wycenę kampanii') . '?=', $body, $headers);
} catch (Throwable $error) { $sent = false; }
if (!$sent) respond(503, 'Nie udało się przekazać wiadomości. Spróbuj ponownie lub napisz na biuro@bennyinvest.pl.');
respond(200, 'Zapytanie zostało przekazane do wysyłki. Dziękujemy za kontakt.');
