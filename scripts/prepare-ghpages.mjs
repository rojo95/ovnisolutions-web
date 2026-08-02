// scripts/prepare-ghpages.mjs
//
// Prepara la carpeta `docs/` para GitHub Pages tras un build con prerender.
// Con SSR configurado, `ng build --output-path docs` genera:
//   - docs/browser/  -> HTML prerenderizados + assets (lo que GH Pages sirve)
//   - docs/server/   -> bundle del servidor Node (solo útil para SSR en servidor)
//
// Este script mueve el contenido de docs/browser/ a la raíz de docs/ y
// elimina docs/browser y docs/server, dejando docs/ lista para commit
// en la rama gh-pages igual que antes del prerender.
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';

const root = 'docs';
const browser = `${root}/browser`;

if (!existsSync(browser)) {
  throw new Error(
    `No existe ${browser}. Ejecuta antes "ng build --output-path docs".`,
  );
}

for (const entry of readdirSync(browser)) {
  cpSync(`${browser}/${entry}`, `${root}/${entry}`, { recursive: true });
}

rmSync(browser, { recursive: true, force: true });
rmSync(`${root}/server`, { recursive: true, force: true });

console.log('docs/ listo para GitHub Pages (contenido prerenderizado en la raíz).');
