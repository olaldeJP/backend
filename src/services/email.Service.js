import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER, PORT_EMAIL } from "../config/config.js";

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      port: PORT_EMAIL,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });
  }

  async sendWelcome(destinatario, userName) {
    const emailOptions = {
      from: EMAIL_USER,
      to: destinatario,
      subject: "Bienvenido - Welcome! ",
      text: ` Bienvenido al Ecommers ${userName}  , Recuerda que este es solo un modelo hecho por Juan Pablo Olalde, gracias por Utilizar estos servicios,
      que tengas un buen dia.
          Saludos`,
    };

    await this.transport.sendMail(emailOptions);
  }
  async passwordChangeEmail(destinatario, jwtUser) {
    const emailOptions = {
      from: EMAIL_USER,
      to: destinatario,
      subject: "Olvidaste Algo? - Forgot Something?",
      html: `<p>Hey You! , Forget your password is totally normal , let me help you... just click <a href="https://backend-xfi3.onrender.com/change/${jwtUser}">HERE</a> to change your password. 
 
      This link Works for 1h Only, be Quick!!!! 
      Have a nice day, love you <3 
      baaaaaaaaay
      </p>`,
    };
    await this.transport.sendMail(emailOptions);
  }
  async deleteUserEmail(emailUser) {
    const emailOptions = {
      from: EMAIL_USER,
      to: emailUser,
      subject: "Your Account was deleted",
      html: `<p>
      Since you were inactive for more than 30 minutes we deleted your account, don't hang up next time, la proxima no cuelgues
      Greetings, - Saludos</p>`,
    };
    await this.transport.sendMail(emailOptions);
  }
}

export const emailService = new EmailService();
