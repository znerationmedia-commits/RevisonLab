// Local dev server — runs the Express API on port 5000 so Vite's proxy works.
// Usage: node server.cjs
// (Keep this terminal open alongside `npm run dev`)

require('dotenv').config();

// Use tsx/ts-node to run the TypeScript API entry point
const { execSync, spawn } = require('child_process');

const args = [
    '--require', 'dotenv/config',
    '--loader', 'ts-node/esm',
    '--experimental-specifier-resolution=node',
    'api/server-local.ts'
];

console.log('[DEV SERVER] Starting local API server on port 5000...');

const proc = spawn(process.execPath, args, {
    stdio: 'inherit',
    env: { ...process.env }
});

proc.on('exit', (code) => {
    console.log(`[DEV SERVER] Exited with code ${code}`);
});
