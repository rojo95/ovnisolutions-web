# AGENTS.md — ovnisolutions-web

Sitio corporativo de **OVNISOLUTIONS** en **Angular 14** (SCSS, Angular Material + Bootstrap 5). Consume una API REST de Node que vive en el repo hermano `ovnisolutions-api`, **fuera de este repositorio**.

## Gestor de paquetes: usar pnpm

- Lockfile vigente: `pnpm-lock.yaml`. El `package-lock.json` que también está en el repo es de formato antiguo (npm) y no se mantiene: **no uses `npm install`**.
- Todos los scripts de `package.json` se ejecutan igual con `pnpm` (`pnpm start`, `pnpm run build`, etc.).

## Comandos

- Dev server: `pnpm start` → `http://localhost:4200` (hot reload)
- Build producción: `pnpm run build` → carpeta `build/`, base-href `/`
- Build GitHub Pages: `pnpm run build-git` → carpeta `docs/`, base-href `ovnisolutions-web` (sin barras, así está configurado)
- Build dev: `pnpm run build-dev` → carpeta `dist/`, base-href `/`
- Tests: `pnpm test` → Karma + Jasmine; **requiere Chrome instalado** (no hay headless configurado). Corre en **modo watch** (`singleRun: false`): para una pasada única usa `pnpm test -- --watch=false`; para un solo archivo, `pnpm test -- --include='src/app/**/foo.spec.ts'`
- Scaffolding: `ng generate component|service|guard|pipe|...` (SCSS por defecto, prefijo `app`)

No hay lint configurado: `eslint` es solo una dependencia, sin config ni script.

**Angular 14 (no standalone):** los builds usan el builder clásico (`@angular-devkit/build-angular:browser`) y módulos NgModule. No generes features de Angular 15+ (standalone components, signals, control-flow `@if`/`@for`) porque no son compatibles.

## Backend y entorno

- Dev: la app espera la API en `http://localhost:3001/1.0.0` (`environment.ts`). Ojo: `ovnisolutions-api` escucha en el puerto 3000 por defecto — verifica cómo se levanta para que responda en 3001.
- Prod: `api.ovnisolutions.com`. El swap `environment.ts` ↔ `environment.prod.ts` es automático (`fileReplacements` en `angular.json`) al buildear producción.
- `appToken` (usado como header `x-app-authorization-token`) y `officialEmail` están **hardcodeados y difieren entre dev y prod**. Son secretos reales: no los cambies sin revisar ambos archivos.

## Arquitectura y gotchas

- Rutas reales en `src/app/app-routing.module.ts`:
  - `/home` y `/login` → bajo `GuestLayout` (`GuestGuard`)
  - `/dashboard` → bajo `AuthLayout` (`AuthGuard`)
  - `/not-found/:errorCode`; `**` redirige a `/not-found/404`
- **Gotcha**: `app.module.ts` registra un `RouterModule.forRoot` extra con catch-all `**` → `HomeComponent`, además de importar `AppRoutingModule`. Al agregar rutas, hazlo **solo** en `app-routing.module.ts`; no dupliques el catch-all.
- El **único** servicio que toca el backend real es `services/client/new-service.service.ts`: `POST {backend}/ovnisolutions/clients/new-web-requirement` con header `x-app-authorization-token` = `environment.appToken`. Usa `axios` inyectado por DI (token `'axios'`, provisto en `AppModule`).
- `services/auth/auth.service.ts` usa un **mock de `mockapi.io` hardcodeado** (NO `environment.backend`); guarda el token en `localStorage` y eso es lo que consultan los guards.
- `services/seo-service/seo.service.ts` setea título + meta tags OG/keywords por página.
- Layouts: `guest-layout` (páginas públicas) vs `auth-layout` (área autenticada con `AuthMenuComponent`).

## TypeScript y estilo

- `tsconfig.json`: `strict` + `strictTemplates` + `noImplicitOverride`. El código generado debe cumplirlo.
- `.editorconfig`: 2 espacios de indentación, comillas simples en TS.

## Git y deploy

- Deploy: GitHub Pages desde la rama `gh-pages`, que contiene la carpeta `docs/` generada con `pnpm run build-git`. `/docs` **no** está en `.gitignore`: se commitea a propósito.
- Convención del historial: mensajes de commit en **español**.

## CodeGraph

El repo está indexado (`.codegraph/`; la DB no se commitea, tiene su propio `.gitignore`). Antes de grep/lectura para localizar código, usar desde la raíz del repo:

- `codegraph explore "<símbolo o pregunta>"` — símbolos relevantes + call paths en una sola salida
- `codegraph node <símbolo-o-archivo>` — un símbolo con callers/callees, o leer un archivo con números de línea

(O las tools MCP `codegraph_explore` / `codegraph_node` si están disponibles). Tras cambios de código, sincronizar con `codegraph sync`. Ver `KNOWLEDGE_MAP.md` para el mapa de dominio y arquitectura.
