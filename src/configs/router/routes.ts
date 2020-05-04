import express, { Router } from 'express';
import authSecurity from "@security/auth";
const routerUn: Router = express.Router();
const routerAu = express.Router();
routerAu.use(authSecurity);

export const routerUnsafe = routerUn;
export const routerAuth = routerAu;
