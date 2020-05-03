import { Router } from 'express';

const router = Router();

const authSecurity = require("@security/auth");
const routerAuth = Router();
routerAuth.use(authSecurity);

export default [router, routerAuth]