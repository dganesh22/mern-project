const nodemailer = require('nodemailer')

const mailHandler = async (receiver, sub, temp, fileAttachment = []) => {
    try {
        // email config settings
        let transporter = await nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            port: process.env.MAIL_PORT,
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        // handler function to send mail 
        let res = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: receiver,
            subject: sub,
            html: `<div> ${temp} </div>`,
            attachments: fileAttachment
        })

        // converting the mail to promise constructor
        return new Promise(function (resolve, reject) {
            resolve(res)

            reject("error sending email..!")
        })
    } catch (err) {
        return err.message
    }
}

module.exports = mailHandler