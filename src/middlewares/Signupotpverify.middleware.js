import { otpStore } from './Signupotpgen.middleware.js'; 
import { asyncHandler } from '../utils/asyncHandler.js';  
const signupvalidateOtp = asyncHandler((req, res, next) => {
    const studentemail = req.session.tempUser.email; // Use email from session
    const { otp } = req.body;
  
    const storedOtp = otpStore.get(studentemail);
    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
      req.flash("error", "OTP has expired. Please request a new one.");
      return res.redirect("/api/v1/users/register");
    }
  
    if (storedOtp.otp !== otp) {
      req.flash("error", "Invalid OTP. Please try again.");
      res.render("users/signupOtp.ejs");
    }
  
    otpStore.delete(studentemail); // Remove OTP after successful validation
    next(); // Proceed to complete registration
  });
  
  export { signupvalidateOtp}