# AGENTS.md — ovnisolutions-web

Sitio de OVNISOLUTIONS en **Angular 14** (SCSS, Angular Material + Bootstrap 5). Consume una API REST de Node (Express/Sequelize/PostgreSQL) que vive en el repo hermano `ovnisolutions-api`, fuera de este repositorio.

## Comandos

- Dev server: `pnpm start` (o `ng serve`) → `http://localhost:4200`
- Build producción: `pnpm run build` → carpeta `build/`, base-href `/`
- Build para GitHub Pages: `pnpm run build-git` → carpeta `docs/`, base-href `ovnisolutions-web`
- Tests: `pnpm test` (Karma + Jasmine; requiere Chrome, sin headless configurado)
- Scaffolding: `ng generate component|service|guard|pipe ...` (SCSS por defecto, prefijo `app`)

## Gestor de paquetes: usar pnpm

- Lockfile vigente: `pnpm-lock.yaml`; `node_modules` tiene layout de pnpm (`.pnpm/`).
- `package-lock.json` está desactualizado (2022): **no** usar `npm install`.
- No hay lint configurado: `eslint` es solo una dependencia, no hay config ni script.

## Backend y entorno

- Dev: la app espera la API en `http://localhost:3001/1.0.0` (`environment.ts`). Ojo: `ovnisolutions-api` escucha en el puerto 3000 por defecto — verifica cómo se levanta (posiblemente vía su `docker-compose.yml`) para que responda en 3001.
- Prod: `api.ovnisolutions.com`; `environment.prod.ts` se intercambia automáticamente por `fileReplacements` en `angular.json` al hacer build de producción.
- `appToken` y `officialEmail` están hardcodeados y difieren entre dev y prod: son sensibles, no los expongas ni los cambies sin revisar ambos entornos.

## Arquitectura y rutas

- Rutas reales en `src/app/app-routing.module.ts`:
  - `/home` y `/login` → bajo `GuestLayout` (protegidas con `GuestGuard`)
  - `/dashboard` → bajo `AuthLayout` (protegida con `AuthGuard`)
  - `/not-found/:errorCode`; `**` redirige a `/not-found/404`
- Gotcha: `app.module.ts` registra un `RouterModule.forRoot` extra con catch-all `**` → `HomeComponent`, además de importar `AppRoutingModule`. Al agregar rutas, hazlo **solo** en `app-routing.module.ts`; no dupliques el catch-all.
- Layouts: `guest-layout` (páginas públicas) vs `auth-layout` (área autenticada con `AuthMenuComponent`).

## Git y deploy

- Remote: `https://github.com/rojo95/ovnisolutions-web` — ramas: `main`, `addAuth` (rama de trabajo actual), `SEOBranch`, `contactForm`, `moyBranch`, `gh-pages`.
- Deploy: GitHub Pages desde la rama `gh-pages`, que contiene la carpeta `docs/` (generada con `pnpm run build-git`). `/docs` **no** está en `.gitignore`: se commitea a propósito.
- Mensajes de commit en español (convención del historial).

## Convenciones

- TypeScript estricto (`strict`, `strictTemplates`, etc. en `tsconfig.json`): el código generado debe cumplirlo.
- `.editorconfig`: 2 espacios de indentación, comillas simples en TS.

## CodeGraph

El repo está indexado (`.codegraph/`). Antes de grep/lectura para localizar código, usar (desde la raíz del repo):

- `codegraph explore "<símbolo o pregunta>"` — símbolos relevantes + call paths
- `codegraph node <símbolo-o-archivo>` — un símbolo con callers/callees, o leer un archivo con números de línea

(O las tools MCP `codegraph_explore` / `codegraph_node` si están disponibles). Tras cambios de código, sincronizar con `codegraph sync`. Ver `KNOWLEDGE_MAP.md` para el mapa de dominio y arquitectura.
