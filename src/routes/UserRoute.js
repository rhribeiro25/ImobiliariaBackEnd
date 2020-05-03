import UserController from '@controllers/UserController'
import AuthSecurity from '@secutiry/auth'
import { Router } from 'express'

const router = Router()
const routerAuth = Router()

routerAuth.use(AuthSecurity)

/*************************** Rotas de Usuário ***************************/
router.post('/user/create', async (req, res) =>{
    UserController.create(req, res);
});
routerAuth.get('/user/list', UserController.list)
routerAuth.get('/user/show/:id', UserController.show)
routerAuth.delete('/user/delete/:id', UserController.delete)
routerAuth.patch('/user/update/:id', UserController.update)
router.post("/user/authenticate", UserController.authenticate)
router.post("/user/forgot_password", UserController.forgotPassword)
router.patch("/user/reset_password", UserController.resetPassword)
/************************************************************************/

export default [router, routerAuth]