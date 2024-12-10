import {Router} from  "express";
import { registeruser,loginUser,logoutUser,refreshAccessToken,showsignup,showLogin} from "../controllers/user.controller.js";
import { registerStudent } from "../controllers/Register.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {isLoggedIn} from "../middlewares/auth.middleware.js"
import { generateOtp } from "../middlewares/genotp.middleware.js";
import { validateOtp } from "../middlewares/validateotp.middleware.js";
const router=Router();//Creating an instance or router
router.route("/register").get(showsignup);//route for getting an Ejs template
router.route("/register").post( registeruser)
router.route("/login").get(showLogin);
router.route("/login").post(loginUser);
router.route("/logout").post(isLoggedIn,logoutUser);
router.route("/refreshtoken").post(refreshAccessToken);

// Route to initiate registration
router.route('/eventregister')
  .post(isLoggedIn, generateOtp, (req, res) => {
    // Render OTP input form
    res.render('users/otp.ejs');
  });

// Route to validate OTP and register
router.route('/verify-otp')
  .post(isLoggedIn, validateOtp, registerStudent);


export default router;