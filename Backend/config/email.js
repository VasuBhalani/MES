import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", 
  port: 465, 
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: verify connection at startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});
