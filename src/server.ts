import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environment } from './environments/environment';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

app.set('trust proxy', true);
app.use(express.json());

// API proxy endpoint
app.post('/api/verify', async (req, res) => {
  try {
    const { sspId } = req.body;
    if (!sspId) {
      res.status(400).json({ error: 'sspId is required' });
      return;
    }

    const loginPayload = {
      usernameOrEmail: environment.knozApiUsername,
      password: environment.knozApiPassword,
      appType: 0
    };
    
    const loginResponse = await fetch('https://knoz-api.knoz.online/api/Auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload)
    });
    
    if (!loginResponse.ok) {
      res.status(loginResponse.status).json({ error: 'Failed to authenticate with Knoz API' });
      return;
    }
    
    const loginData: any = await loginResponse.json();
    const token = loginData.record?.token || loginData.token;
    
    if (!token) {
      res.status(500).json({ error: 'No token received from Knoz API' });
      return;
    }
    
    const courseDetailsUrl = `https://knoz-api.knoz.online/api/Monitor/Assigned-Student-Course-Details?SSPId=${sspId}`;
    const courseResponse = await fetch(courseDetailsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!courseResponse.ok) {
       res.status(courseResponse.status).json({ error: 'Failed to fetch course details' });
       return;
    }
    
    const courseData = await courseResponse.json();
    res.json(courseData);
    
  } catch (error: any) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

export const reqHandler = createNodeRequestHandler(app);

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 3000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
