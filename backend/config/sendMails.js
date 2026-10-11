import nodemailer from 'nodemailer'
import User from '../models/Users.js';
import 'dotenv/config.js'

export const sendRegisterSuccessMail = async (email)=>{
    const user = await User.findOne({email});
    
    const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})

const mailConfigurations = {
    from:process.env.SMTP_USER,
    to:email,
    subject: "Email Verfication", 
    html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">

        <h1 style="color: #2563eb; text-align: center;">
          Welcome to AbhiJob - A Job Portal Website 🎉
        </h1>

        <p>Hi ${user.username},</p>

        <p>
          Thank you for joining <strong>AbhiJob</strong>. Your account has been successfully created and verified.
        </p>

        <p>
          You can now:
        </p>

        <ul>
          <li>Browse available job opportunities</li>
          <li>Apply for jobs easily</li>
          <li>Manage your profile and applications</li>
          <li>Stay updated with the latest openings</li>
        </ul>

        <div style="text-align: center; margin: 30px 0;">
          <a
            href="http://localhost:3000/jobs"
            style="
              background-color: #2563eb;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            "
          >
            Explore Jobs
          </a>
        </div>

        <p>
          We are excited to have you with us and wish you success in your career journey.
        </p>

        <p>
          Best Regards,<br />
          <strong>AbhiJob Support Team</strong>
        </p>

        <hr style="margin: 25px 0;" />

        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          This is an automated email. Please do not reply to this message.
        </p>

      </div>
    `, 
}

const info = await transporter.sendMail(mailConfigurations);
return info;

}

export const sendVerificationOTPMail = async(email,otp)=>{
    const user = await User.findOne({email});
    if(!user){
        throw new Error("User not found to send OTP mail");
    }

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    })

    const mailConfigurations = {
        from:process.env.SMTP_USER,
        to:email,
        subject:"OTP Verification",
        html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
        
        <h2 style="color: #2563eb; text-align: center;">
          Email Verification
        </h2>

        <p>Hello ${user.username},</p>

        <p>
          Thank you for registering with our platform. To complete your email verification,
          please use the OTP below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="
            display: inline-block;
            background-color: #f3f4f6;
            padding: 15px 30px;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #111827;
            border-radius: 6px;
          ">
            ${otp}
          </span>
        </div>

        <p>
          This OTP is valid for <strong>24 hours</strong>.
        </p>

        <p>
          If you did not create an account, please ignore this email.
        </p>

        <hr style="margin: 20px 0;" />

        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          This is an automated email. Please do not reply.
        </p>

      </div>
    `,
    }

    const info = await transporter.sendMail(mailConfigurations);
    return info;
}

export const sendResetPasswordMail = async (email,otp)=>{
  const user = await User.findOne({email});
    const transporter = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      }
    })

    const mailConfigurations = {
      from: process.env.SMTP_USER,
      to:email,
      subject:"Password Reset OTP",
      html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px;">
        
        <h2 style="color: #2563eb; text-align: center;">
          Password Reset
        </h2>

        <p>Hello ${user.username},</p>

        <p>
          Thank you for registering with our platform. To reset your password,
          please use the OTP below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="
            display: inline-block;
            background-color: #f3f4f6;
            padding: 15px 30px;
            font-size: 28px;
            font-weight: bold;
            letter-spacing: 5px;
            color: #111827;
            border-radius: 6px;
          ">
            ${otp}
          </span>
        </div>

        <p>
          This OTP is valid for <strong>24 hours</strong>.
        </p>

        <p>
          If you did not create an account, please ignore this email.
        </p>

        <hr style="margin: 20px 0;" />

        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          This is an automated email. Please do not reply.
        </p>

      </div>
    `
    }

    const info = await transporter.sendMail(mailConfigurations);
    return info;
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

export const sendContactMail = async ({ name, email, subject, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const emailSubject = subject.replace(/[\r\n]+/g, " ").trim();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `Contact form: ${emailSubject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    html: `
      <div style="margin: 0; padding: 32px 16px; background-color: #f8fafc; font-family: Arial, Helvetica, sans-serif; color: #111827;">
        <div style="max-width: 600px; margin: 0 auto; overflow: hidden; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; box-shadow: 0 8px 24px rgba(30, 36, 109, 0.08);">
          <div style="padding: 28px 32px; background: linear-gradient(120deg, #1e246d, #5365e8); color: #ffffff;">
            <div style="margin-bottom: 18px; color: #f4bc19; font-size: 13px; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">AbhiJob</div>
            <h1 style="margin: 0; font-size: 24px; line-height: 1.3;">New contact message</h1>
            <p style="margin: 8px 0 0; color: #e0e7ff; font-size: 14px;">Someone reached out through your Contact Us form.</p>
          </div>
          <div style="padding: 28px 32px;">
            <div style="margin-bottom: 20px; padding: 16px 18px; background-color: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px;">
              <p style="margin: 0 0 12px; font-size: 14px;"><strong style="color: #1e246d;">Name</strong><br />${safeName}</p>
              <p style="margin: 0 0 12px; font-size: 14px;"><strong style="color: #1e246d;">Email</strong><br /><a href="mailto:${safeEmail}" style="color: #5365e8; text-decoration: none;">${safeEmail}</a></p>
              <p style="margin: 0; font-size: 14px;"><strong style="color: #1e246d;">Subject</strong><br />${safeSubject}</p>
            </div>
            <h2 style="margin: 0 0 10px; color: #1e246d; font-size: 16px;">Message</h2>
            <div style="padding: 16px 18px; border-left: 4px solid #f4bc19; background-color: #fffbeb; border-radius: 4px 12px 12px 4px; font-size: 14px; line-height: 1.7; white-space: pre-wrap; overflow-wrap: anywhere;">${safeMessage}</div>
            <div style="margin-top: 24px;">
              <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${emailSubject}`)}" style="display: inline-block; padding: 12px 20px; background-color: #f4bc19; border-radius: 10px; color: #111827; font-size: 14px; font-weight: bold; text-decoration: none;">Reply to ${safeName}</a>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid #e5e7eb; color: #6b7280; text-align: center; font-size: 12px;">Sent from the AbhiJob Contact Us form</div>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailConfigurations);
};
