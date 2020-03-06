/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2020-02-10 18:38:09
 * @LastEditors  : Darren
 * @LastEditTime : 2020-02-10 18:48:43
 */
const Service = require("egg").Service
const nodeMailer = require("nodemailer")


const userEmail = "925603297@qq.com"
let transporter = nodeMailer.createTransport({
  service: "qq",
  port: 465,
  secureConnection: true,
  auth: {
    user: userEmail,
    pass: "ipvdiogdxuozbcjh"
  }
})

class ToolSerivce extends Service {
  async sendEmail(email, title, html) {
    const { ctx } = this
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: title,
      text: "",
      html
    }
    try {
      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

module.exports = ToolSerivce