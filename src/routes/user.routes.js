import { Router } from "express";
import { landing,renderSignup,renderSignin } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router=Router();

router.get('/',verifyJWT,landing);
router.get('/user/signup',renderSignup);
router.get('/user/signin',renderSignin);

export default router