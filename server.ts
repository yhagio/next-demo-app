import express from 'express';
import next from 'next';
import i18nMiddleware from 'next-translate/i18nMiddleware';
import i18nConfig from './i18n.json'

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(i18nMiddleware(i18nConfig));

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
