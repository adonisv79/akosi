import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Transporter, createTransport } from 'nodemailer';
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Configuration } from "src/config/configuration";

@Injectable()
export class EmailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor(private config: ConfigService<Configuration>) {
    const smtpConfig = this.config.get('smtp', { infer: true });
    this.transporter = createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: true,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass
      }
    });
  }

  async sendEmail(mailOptions: Mail.Options) {
    const info = await this.transporter.sendMail(mailOptions);
    return { id: info.messageId }
  }
}