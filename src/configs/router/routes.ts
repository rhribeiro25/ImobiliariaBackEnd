import Router from 'express';
import { authSecutiry } from '@security/auth';

let routerUns = Router();
let routerAut = Router();
routerAut.use(authSecutiry);

export const routerUnsafe = routerUns;

export const routerAuth = routerAut;

export default routerUns;
