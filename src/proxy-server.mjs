async function run() {
  let serverEn, serverEs, serverBase;

  try {
    ({ app: serverEn } = await import('./server/en/server.mjs'));
  } catch {
    console.log('Server /en not supported');
  }

  try {
    ({ app: serverEs } = await import('./server/es/server.mjs'));
  } catch {
    console.log('Server /es not supported');
  }

  try {
    ({ app: serverBase } = await import('./server/server.mjs'));
  } catch {
    console.log('Server / not supported');
  }

  const express = require('express');
  const port = process.env.PORT || 4000;
  const server = express();

  if (serverEn && serverEs) {
    server.use('/es', serverEs());
    server.use('/en', serverEn());
  } else {
    server.use('/', serverBase());
  }

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run().then(() => console.log('Started'));