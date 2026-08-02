import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Páginas públicas: se prerenderizan como HTML estático (SSG)
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  {
    path: 'not-found/:errorCode',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => [{ errorCode: '404' }],
  },
  // Área autenticada: shell CSR (los guards redirigen al login)
  { path: 'dashboard', renderMode: RenderMode.Client },
  // Cualquier otra ruta: shell CSR
  { path: '**', renderMode: RenderMode.Client },
];
