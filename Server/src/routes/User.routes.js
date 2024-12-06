import {Router} from  "express";
import { registeruser,loginUser,logoutUser,refreshAccessToken,showsignup,showLogin} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router();//Creating an instance or router
router.route("/register").get(showsignup);//route for getting an Ejs template
router.route("/register").post(
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),
    registeruser)

router.route("/login").get(showLogin);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refreshtoken").post(refreshAccessToken);


export default router;