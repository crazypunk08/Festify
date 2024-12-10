import fs from 'fs';  // To handle file operations
import path from 'path';  // To manage file paths
import QRCode from 'qrcode';  // Assuming you're using the `qrcode` package
import {Student} from "../models/student.models.js"
import nodemailer from 'nodemailer';
import {asyncHandler} from '../utils/asyncHandler.js';
import{ApiError} from '../utils/ApiError.js';  // Assuming this is your custom error handler
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  // Get the filename
const __dirname = dirname(__filename);  // Get the directory name


const registerStudent = asyncHandler(async (req, res) => {
  // Extract user ID from req.user (assuming the user is authenticated)
  const studentemail = req.user.email;
  const student = await Student.findOne({ email: studentemail }); // Find the student in the DB

  if (!student) {
    req.flash("error","You are not a student of KLS GIT");
    return res.redirect("/api/v1/events/list");
  }

  // Check if the QR code is already generated
  if (student.qrGenerated) {
    throw new ApiError('QR code has already been generated for this student');
  }

  // Step 3: Generate the QR Code
  const qrData = {
    name: student.username,
    college: 'KLS GOGTE INSTITUTE OF TECHNOLOGY',
    message: 'STUDENT',
  };

  // Generate the QR code and store it as a file
  const qrCodeImage = await QRCode.toFile(path.join(__dirname, '../../public/temp', `${student.email}_qr.png`), JSON.stringify(qrData));

  // Step 4: Send QR code via email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',  // or other service (e.g., Outlook, SMTP server)
    auth: {
      user: process.env.EMAIL_USER,  // Your email address
      pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
  });

  const mailOptions = {
    from: '"KLS GIT Admin" <naren.lakamannavar@gmail.com>',  // Sender address
    to: student.email,  // Student's email
    subject: 'Your Student QR Code',  // Subject line
    html: `
      <h1>Registration for AURA 2025 successfull!!</h1>
      <p>Hello ${student.username},</p>
      <p>Please find your Event pass attached:</p>
      <p>Keep this QR code safe. It contains your  credentials do not disclose it to anyone.</p>
      <p>Carry your college Id card and this pass at entry of event.</p>
    `,
    attachments: [
      {
        filename: `${student.email}_qr.png`,  // Name of the file to be sent
        path: path.join(__dirname, '../../public/temp', `${student.email}_qr.png`),  // Path of the file
        cid: 'qrCode'  // This is optional, if you need to reference the image inside the email
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully");

    // Update the student record to indicate that the QR code has been generated
    student.qrGenerated = true;
    await student.save();

    req.flash("success","QR code sent to your college email id successfully");
    res.status(200).redirect("/api/v1/events/list");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: 'Failed to send email. Please try again later.',
      error: error.message,
    });
  } finally {
    // Delete the temp QR code file after sending the email
    fs.unlink(path.join(__dirname, '../../public/temp', `${student.email}_qr.png`), (err) => {
      if (err) console.error('Error deleting temp QR code file:', err);
    });
  }
});

export {registerStudent};