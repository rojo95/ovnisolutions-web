# KNOWLEDGE_MAP — ovnisolutions-web

Web corporativa de **OVNISOLUTIONS** (agencia de desarrollo web y marketing digital) en **Angular 14**. Para comandos y operación, ver `AGENTS.md` (misma raíz).

## Dominio (negocio)

- Sitio público que muestra servicios (diseño web, apps móviles, SEO, branding, redes sociales, logos, mantenimiento), portafolio y equipo.
- Conversión: el visitante llena un **formulario de contacto** (stepper en `contact-us`) que crea una *nueva solicitud de servicio* en el backend.
- Área autenticada: `login` → `dashboard` (gestión interna; el login aún es un mock, ver ADR-002).

## Arquitectura

- Angular 14, un solo módulo (`AppModule`) que declara todo; SCSS, Angular Material + Bootstrap 5.
- **Layouts**: `guest-layout` (páginas públicas `home`, `login`) y `auth-layout` (área autenticada, menú `AuthMenuComponent`).
- **Guards**: `AuthGuard` (exige `localStorage.token`, si no redirige a `/login?returnUrl=...`) y `GuestGuard` (si hay token redirige a `/dashboard`).
- **Servicios** (`src/app/services/`):
  - `auth/auth.service.ts` — login/logout, `isLoggedIn()` vía `localStorage.token`. **Ojo: usa `mockapi.io` hardcodeado, no `environment.backend`.**
  - `client/new-service.service.ts` — único servicio contra el backend real: `POST {backend}/ovnisolutions/clients/new-web-requirement` con header `x-app-authorization-token` = `environment.appToken`.
  - `seo-service/seo.service.ts` — setea título + meta tags OG/keywords por página.
- **Environments**: dev `backend = http://localhost:3001/1.0.0`; prod `api.ovnisolutions.com` (swap automático por `fileReplacements`).
- `axios` se inyecta vía DI con token `'axios'` (provisto en `AppModule`).
- Rutas reales en `app-routing.module.ts`; ver ADR-003 para el gotcha del doble `forRoot`.

## Flujo de datos

```
Visitante → contact-us/FormStepper → NewServiceService.sendServiceRequest()
         → POST {backend}/ovnisolutions/clients/new-web-requirement
         → header x-app-authorization-token: environment.appToken

Login → AuthService.login() → GET mockapi.io (mock) → localStorage.setItem('token')
      → AuthGuard/AuthService.isLoggedIn() deciden acceso a /dashboard
```

## ADRs (decisiones observadas; no hay documentos formales)

- **ADR-001 — Deploy GitHub Pages**: la rama `gh-pages` contiene la carpeta `docs/` (build con `pnpm run build-git`, base-href `ovnisolutions-web`). `/docs` se commitea a propósito (no está en `.gitignore`).
- **ADR-002 — Auth con mock**: `AuthService.login` consulta un endpoint de `mockapi.io` (GET sobre un recurso `buyers/1`) y guarda lo que devuelva como token; no está conectado al backend real.
- **ADR-003 — Doble `RouterModule.forRoot`**: `app.module.ts` registra su propio `forRoot` con catch-all `**` → `HomeComponent`, además de importar `AppRoutingModule` (rutas reales). Nuevas rutas van **solo** en `app-routing.module.ts`.
- **ADR-004 — Gestor de paquetes**: `pnpm` (lockfile vigente `pnpm-lock.yaml`); `package-lock.json` está desactualizado y no debe usarse.

## Convenciones

- Mensajes de commit en **español** (historial).
- TypeScript estricto (`strict` + `strictTemplates`): el código generado debe cumplirlo.
- `.editorconfig`: 2 espacios, comillas simples en TS; componentes con prefijo `app`, estilos SCSS.
- No hay lint configurado (la dependencia `eslint` no tiene config ni script).

## Navegación con CodeGraph

El repo está indexado (`.codegraph/`). Antes de buscar con grep, usar:

```bash
codegraph explore "<símbolo o pregunta>"   # símbolos relevantes + call paths
codegraph node <símbolo-o-archivo>         # un símbolo con callers/callees, o leer archivo con números de línea
```

(O las tools MCP `codegraph_explore` / `codegraph_node` si están disponibles). Ejecutar siempre desde la raíz del repo `/workspace/ovnisolutions-web`. Sincronizar tras cambios con `codegraph sync`.
