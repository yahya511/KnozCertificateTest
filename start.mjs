import '@angular/compiler';
import { ɵsetAngularAppEngineManifest } from '@angular/ssr';
import manifest from './dist/knoz-academy/server/angular-app-engine-manifest.mjs';
ɵsetAngularAppEngineManifest(manifest.default || manifest);
await import('./dist/knoz-academy/server/server.mjs');
