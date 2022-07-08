import * as nodemailer from 'nodemailer';
import * as striptags from 'striptags';
import { Response } from 'express';
import * as ejs from 'ejs';
import * as fs from 'fs';

class MailHelper {
   public appObject: Response;

   private mailerObj: nodemailer.Transporter;

   constructor() {
      this.mailerObj = this.mailConn();
   }

   public sendMail(
      sendTo: string,
      subjectLine: string,
      textLine: string,
      template: string
      // res: any = ''
   ) {
      return new Promise((resolve) => {
         this.appObject.render(
            template,
            {
               subject: subjectLine,
               message: textLine,
            },
            (err: Error, htmlview: string) => {
               console.log(err);
               try {
                  this.mailerObj.sendMail({
                     from: process.env.SMTP_FROM, // sender address
                     to: sendTo, // list of receivers
                     cc: process.env.CC_EMAIL,
                     subject: subjectLine, // Subject line
                     text: striptags.default(htmlview), // plain text body
                     html: htmlview, // html body
                  });
                  resolve(true);
               } catch (e) {
                  console.log('Errors under email', e);
                  resolve(false);
               }
            }
         );
      });
   }

   public sendEmail(sendTo: string, subjectLine: string, textLine: string) {
      console.log('Here Email', sendTo, subjectLine);
      try {
         this.mailerObj.sendMail({
            from: process.env.SMTP_FROM, // sender address
            to: sendTo, // list of receivers
            cc: process.env.CC_EMAIL,
            subject: subjectLine, // Subject line
            text: striptags.default(textLine), // plain text body
            html: this.emailHtmlParser(textLine, subjectLine), // html body
         });
      } catch (e) {
         console.log('Errors under sendEMail', e);
      }
   }

   private mailConn() {
      const hostName: string = process.env.SMTP_HOST;
      const transporter = nodemailer.createTransport({
         host: hostName, // 'smtp.ethereal.email',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
            user: process.env.SMTP_USER, // generated ethereal user
            pass: process.env.SMTP_PASSWORD, // generated ethereal password
         },
      });
      return transporter;
   }

   private emailHtmlParser(emailContent: string, emailTitle: string) {
      // eslint-disable-next-line
      const str: string = fs.readFileSync(
         __dirname + '/../../views/common.ejs',
         'utf8'
      );
      const messageHtml = ejs.render(str, {
         message: emailContent,
         email_title: emailTitle,
      });
      return messageHtml;
   }
}
export default new MailHelper();
