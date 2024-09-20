import { Router } from "express";
import { landing,renderSignup,renderSignin,signup } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {upload} from "../middlewares/multer.middlewares.js"

const router=Router();

router.get('/',verifyJWT,landing);
router.get('/user/signup',renderSignup);
router.get('/user/signin',renderSignin);
router.post('/user/account/signup',upload.fields([
    {
        name:"avatar",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),signup);

export default router