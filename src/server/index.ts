const http = require('http');
const debug = require('debug');
const path = require('path');

import { App } from './App';

const port = formatPort(process.env.PORT || 3000);

const app = new App(process.env.APP);
app.express.set('port', port);

function formatPort(val: number | string): number | string | boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  
  if (isNaN(port)) {
    return val;
  } else if (port >= 0) {
    return port;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall != 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES': {
      console.error(`Pipe port ${port} requires elevated privileges`)
      process.exit(1);
      break;
    }
    case 'EADDRINUSE': {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    }
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();

  debug(`Listening on ${addr}`);
}

const server = http.createServer(app.express);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);