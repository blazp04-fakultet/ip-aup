import { startServer } from './app.ts';

async function main() {
  console.log('Starting application...');
  startServer();
  console.log('Application started.');
}

main();
