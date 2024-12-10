import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export async function GET() {
  try {
    const srcPath = resolve(__dirname, '../../../src');
    const directories = readdirSync(srcPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => ({
        name: dirent.name,
        path: join('src', dirent.name)
      }));

    return new Response(JSON.stringify(directories), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Kon directories niet laden' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
