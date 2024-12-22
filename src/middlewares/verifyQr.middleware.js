import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js';
import { Faculty } from '../models/faculty.models.js';

const updateQrVerified = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Find the user by ID and set `qrVerified` to true
  const user = await User.findById(id);
  if (!user) {
    req.flash('error','User not found')
  }

  // Check if the QR code has already been verified
  if (user.qrVerified) {
    req.flash('error', `User ${user.username}'s QR code already verified.`);
    res.render("scanner.ejs");
  }else {
    user.qrVerified = true; // Mark as verified
    await user.save({validateBeforeSave:false});
    req.flash('success', ` ${user.username} marked as  verified.`);
  }

  next(); // Proceed to the profile page
});


const updateFacultyQr = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // Find the user by ID and set `qrVerified` to true
  const user = await User.findById(id);
  if (!user) {
    req.flash('error', 'Faculty not found');
    return res.redirect("/api/v1/users/list");
  }
  const faculty=await Faculty.findOne({email:user.email});
  if (!faculty) {
    req.flash('error', 'Faculty not found');
    return res.redirect("/api/v1/users/list");
  }
  // Check if the QR code has already been verified
  if (faculty.passes <=0) {
    req.flash('error', `User ${user.username}'s passes exhausted.`);
    res.render("scanner.ejs")
  }else {
    faculty.passes-=1; // Mark as verified
    await faculty.save({validateBeforeSave:false});
    req.flash('success', ` ${user.username} has ${faculty.passes} passes left.`);
  }

  next(); // Proceed to next controller or middleware
});

export { updateQrVerified,updateFacultyQr };
