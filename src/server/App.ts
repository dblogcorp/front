import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';

export class App {
  
  public express: express.Application;
  private appName: string;

  constructor(appName: string) {
    this.appName = appName;

    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
  }

  private routes(): void {
    const router = express.Router();

    console.log(this.appName);

    router.get('/', (req, res, next) => {
      res.sendFile(path.join(__dirname, '../', '/apps/sso/index.html'))
    })
    router.get(`/dist/${this.appName}/:name`, (req, res, next) => {
      const name = req.params.name;
      
      res.sendFile(path.join(__dirname, '../../', `${this.appName}/${name}`))
    })

    this.express.use('/', router);
  }
}

//export default new App().express;