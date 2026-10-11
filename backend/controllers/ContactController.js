import { sendContactMail } from "../config/sendMails.js";

export const sendContactMessage = async (req, res) => {
  try {
    await sendContactMail(req.body);
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your message right now. Please try again later.",
    });
  }
};
