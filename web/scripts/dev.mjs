import { createServer } from 'vite';
import config from '../vite.config.js';

const start = async () => {
  const server = await createServer({
    ...config,
    configFile: false,
  });

  await server.listen();
  server.printUrls();
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
