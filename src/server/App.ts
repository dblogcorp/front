import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';

class App {
  
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
  }

  private routes(): void {
    const router = express.Router();

    router.get('/', (req, res, next) => {
      res.sendFile(path.join(__dirname, '../', '/apps/sso/index.html'))
    })
    router.get('/dist/:name', (req, res, next) => {
      const name = req.params.name;
      
      res.sendFile(path.join(__dirname, '../../', name))
    })

    this.express.use('/', router);
  }
}

export default new App().express;