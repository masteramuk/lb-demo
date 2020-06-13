import {once} from 'events';
import express, {Request, Response} from 'express';
import {Http2Server} from 'http2';
import path from 'path';
import {ApplicationConfig, LbDemoApplication} from './application';

export {ApplicationConfig};

export class ExpressServer {
  private app: express.Application;
  private lbApp: LbDemoApplication;
  private server?: Http2Server; // http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new LbDemoApplication(options);
    this.app.use('/api', this.lbApp.requestHandler);

    // Custom Express routes
    this.app.get('/', function (_req: Request, res: Response) {
      res.sendFile(path.resolve('public/express.html'));
    });
    this.app.get('/hello', function (_req: Request, res: Response) {
      res.send('Hello world!');
    });

    // Serve static files in the public folder
    this.app.use(express.static('public'));
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port ?? 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    //await this.server.close(); // pEvent(this.server, 'close');
    this.server = undefined;
  }
}
