import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from '../security/rateLimit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import routes from '@controllers/index';
import mongoose from '@configs/database/dev';
import session from '@security/session';
import UserController from '@controllers/UserController';
import PersonController from './controllers/PersonController';
import PropertyController from './controllers/PropertyController';
import ContractController from './controllers/ContractController';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.middlewaares();
    this.database();
    this.routes();
  }

  private middlewaares(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    // this.app.use(session);
    /******************************** Security ********************************/
    //Configura vários cabeçalhos HTTP
    this.app.use(helmet());
    //Limitando requisições em 100/h
    this.app.use(rateLimit);
    //Limitando tamanho de body em 10KB
    this.app.use(express.json({ limit: '10kb' }));
    //limpa os dados do mongoose para impedir a ataques por injeção do operador.
    this.app.use(mongoSanitize());
    /**************************************************************************/
    this.app.listen(3000);
  }

  private database(): void {
    mongoose;
  }

  private routes(): void {
    this.app.use('/user', UserController);
    // this.app.use('/person', PersonController);
    // this.app.use('/property', PropertyController);
    // this.app.use('/contract', ContractController);
  }
}

export default new App().app;
