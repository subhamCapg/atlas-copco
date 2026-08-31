import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.resolve(
  __dirname,
  '../node_modules/@ac-brandsframework/abac-lib/index.css',
);

const destination = path.resolve(
  __dirname,
  '../styles/design-system.css',
);

if (!fs.existsSync(source)) {
  throw new Error(`Design System CSS not found: ${source}`);
}

fs.copyFileSync(source, destination);

console.log('Design System CSS synced successfully.');