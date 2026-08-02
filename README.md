# ovnisolutions-web

Web corporativa de **OVNISOLUTIONS** — agencia de desarrollo web y marketing digital — construida con **Angular 22**. Incluye portafolio, servicios, equipo, formulario de contacto (con conexión a una API REST de Node) y un área autenticada (`login`/`dashboard`).

> Stack: Angular 22 · TypeScript 6 (estricto) · SCSS · Angular Material 22 · Bootstrap 5 · ng-bootstrap 21 · FontAwesome 7 · ng-gallery 12 · SweetAlert2 · axios

---

## Requisitos previos

- Node.js 22.22.3+ o 24.15.0+ (requisito de Angular 22; se recomienda Node 24 LTS)
- **pnpm** como gestor de paquetes (ver [Instalación](#instalación))
- Backend corriendo para el formulario de contacto: repo hermano [`ovnisolutions-api`](../ovnisolutions-api) (Node/Express/Sequelize/PostgreSQL)

## Instalación

> **Importante:** usar **pnpm**. El lockfile vigente es `pnpm-lock.yaml`; `package-lock.json` es de formato npm antiguo y **no** debe usarse.

```bash
pnpm install
```

## Configuración

Las variables de entorno viven en `src/environments/`:

| Variable        | Dev (`environment.ts`)                | Prod (`environment.prod.ts`) |
| --------------- | ------------------------------------- | ---------------------------- |
| `backend`       | `http://localhost:3001/1.0.0`         | `api.ovnisolutions.com`      |
| `appToken`      | token de la app (dev)                 | token de la app (prod)       |
| `officialEmail` | `dev.ovnisolutions@ovnisolutions.com` | `contacto@ovnisolutions.com` |

- El build de producción reemplaza `environment.ts` por `environment.prod.ts` automáticamente (`fileReplacements` en `angular.json`).
- **Nota**: la app espera la API en el puerto `3001` en dev, pero `ovnisolutions-api` escucha en `3000` por defecto — verifica cómo se levanta (posiblemente vía su `docker-compose.yml`).

## Comandos

| Comando              | Descripción                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `pnpm start`         | Dev server en `http://localhost:4200` (hot reload)                           |
| `pnpm run build`     | Build de producción en `build/`, base-href `/`                               |
| `pnpm run build-git` | Build para GitHub Pages en `docs/`, base-href `ovnisolutions-web`            |
| `pnpm run build-dev` | Build de desarrollo en `dist/`, base-href `/`                                |
| `pnpm test`          | Tests unitarios (Karma + Jasmine; requiere Chrome, sin headless configurado) |
| `pnpm run watch`     | Build con watch en configuración de desarrollo                               |

### Scaffolding

```bash
ng generate component <nombre>        # genera .ts/.html/.scss/.spec.ts (SCSS por defecto)
ng generate service|guard|pipe|class  # y demás generadores de Angular CLI
```

## Estructura

```
src/
├── app/
│   ├── components/      # menu, footer, slider, services, portfolio, contact-us,
│   │                    # development, ovni-team, card-portfolio, web-design
│   ├── layouts/         # guest-layout (público) y auth-layout (autenticado)
│   ├── guard/           # auth.guard y guest.guard
│   ├── services/        # auth (login), client (formulario), seo (meta tags)
│   ├── shared/          # servicios compartidos
│   ├── views/           # home, login, dashboard, web-services, error, not-found, ...
│   ├── app-routing.module.ts   # ← rutas reales
│   └── app.module.ts
├── environments/        # environment.ts / environment.prod.ts
└── ...
```

## Arquitectura y flujo

- **Rutas** (`app-routing.module.ts`): `/home` y `/login` bajo `GuestLayout` (con `GuestGuard`); `/dashboard` bajo `AuthLayout` (con `AuthGuard`); `/not-found/:errorCode`; `**` → `/not-found/404`.
- **Formulario de contacto**: `ContactUsComponent`/`FormStepper` → `NewServiceService.sendServiceRequest()` → `POST {backend}/ovnisolutions/clients/new-web-requirement` con header `x-app-authorization-token: environment.appToken`.
- **Login**: `AuthService.login()` guarda el "token" en `localStorage`; los guards lo consultan. Actualmente usa un mock (`mockapi.io`), no el backend real.
- **SEO**: `SeoService.generateTagsConfig()` setea título y meta tags (OG/keywords) por página.
- **Gotcha**: `app.module.ts` registra un `RouterModule.forRoot` extra con catch-all `**` → `HomeComponent`. Las rutas nuevas van **solo** en `app-routing.module.ts`.

## Deploy

El sitio se publica en **GitHub Pages** desde la rama `gh-pages`, que contiene la carpeta `docs/`:

```bash
pnpm run build-git   # genera docs/ con base-href ovnisolutions-web
git add docs && git commit && git push origin gh-pages
```

`/docs` no está en `.gitignore`: se commitea a propósito.

## Git

- Remote: `https://github.com/rojo95/ovnisolutions-web`
- Rama principal: `main` (también existen `addAuth`, `SEOBranch`, `contactForm`, `moyBranch`, `gh-pages`)
- Convención: mensajes de commit en **español**.

## Convenciones de código

- TypeScript estricto (`strict` + `strictTemplates` en `tsconfig.json`).
- `.editorconfig`: 2 espacios, comillas simples en TS.
- Componentes con prefijo `app`, estilos en SCSS.
- No hay lint configurado.

## Documentación del repo

- [`AGENTS.md`](AGENTS.md) — guía operativa para agentes (comandos, gotchas, deploy).
- [`KNOWLEDGE_MAP.md`](KNOWLEDGE_MAP.md) — mapa de dominio, arquitectura y ADRs.
- El repo está indexado con **CodeGraph** (`.codegraph/`): usa `codegraph explore "<consulta>"` o `codegraph node <símbolo>` desde la raíz del repo para navegar el código (sincroniza con `codegraph sync` tras cambios).
