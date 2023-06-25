import fs from 'fs';
import nodemailer from 'nodemailer';

export const emailSend = async (email: any) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: 'gmail',

      host: 'smtp.gmail.com',

      port: 465,

      secure: true,

      auth: {
        user: 'bhaumikjsh@gmail.com',

        pass: 'thjcjibhxsylxkda',
      },
    });

    // send mail with defined transport object

    const info = await transporter.sendMail({
      from: 'bhaumikjsh@gmail.com', // sender address

      to: email, // list of receivers

      subject: 'Record files from Data GPT', // Subject line

      text: ``, // plain text body

      attachments: [
        {
          // stream as an attachment
          filename: 'record.pdf',
          content: fs.createReadStream('result.pdf'),
        },
      ],
    });

    console.log('🚀 ~ file: controller.ts:183 ~ emailSend ~ info:', info);
  } catch (error) {
    console.log('🚀 ~ file: controller.ts:188 ~ emailSend ~ error:', error);
  }
};
