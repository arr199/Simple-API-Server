import { Router } from "express";
import nodemailer from 'nodemailer'
import { validateEmail } from "../Schemas/email.js";
import * as dotenv from 'dotenv'


dotenv.config()
export const emailRouter = Router()

emailRouter.post('/' , (req , res) => {
    
    const result = validateEmail(req.body)
    if (result.error) {

        return res.status(400).json({ message : result.error.message })
    }

    const { message } = result.data 

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_SERVER_USER,
          pass: process.env.GMAIL_SERVER_PASS
        }
      });
      const mailOptions = {
        from: 'Arr Email Server',
        to:  process.env.GMAIL_USER,
        subject: 'Sending Email using Node.js',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.status(200).json({ message : "The email was sent" })
})
