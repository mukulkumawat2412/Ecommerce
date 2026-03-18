import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: to,                 // Dynamic email address
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email Info:", info);
    return info;

  } catch (error) {
    console.error("Email Sending Error:", error);
  }
};
