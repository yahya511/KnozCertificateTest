import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { SERVER_URL } from './core/tokens/server-url.token';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: SERVER_URL, useValue: `http://localhost:${process.env['PORT'] || 3000}` }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
