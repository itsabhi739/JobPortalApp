import nodemailer from 'nodemailer'
import User from '../models/Users.js';
import 'dotenv/config.js'

export const sendRegisterSuccessMail = async (email)=>{
    const user = await User.findOne({email});
    
    const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'itsabhi739@gmail.com',
        pass: 'xqio yocj yfec cblz',
    }
})

const mailConfigurations = {
    from:process.env.SMTP_USER,
    to:email,
    subject: "Email Verfication", 
    html:`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">

        <h1 style="color: #2563eb; text-align: center;">
          Welcome to Job Portal 🎉
        </h1>

        <p>Hi ${user.username},</p>

        <p>
          Thank you for joining <strong>Job Portal</strong>. Your account has been successfully created and verified.
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
          <strong>Job Portal Team</strong>
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
            pass: process.env.SMTP_PASSWORD,
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
        pass:process.env.SMTP_PASSWORD
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
