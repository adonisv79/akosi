import { Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";

@Controller('/email')
export class EmailController {
  constructor(private email: EmailService){}

  @Post('/')
  async sendEmail() {
    return await this.email.sendEmail({
      from: '"Bytecommander Mailer 👻" <mailer@bytecommander.com>', // sender address
      to: "adonisv79@gmail.com", // list of receivers
      subject: "Hello ✔ Thanks for registering!", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  }
}