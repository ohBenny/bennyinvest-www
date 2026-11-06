import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
const base = process.env.SITE_BASE_PATH || '/';
if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(base)) throw new Error('SITE_BASE_PATH must be / or a path such as /test/');
export default defineConfig({ output: 'static', base, trailingSlash: 'always', vite: { plugins: [tailwindcss()] } });
