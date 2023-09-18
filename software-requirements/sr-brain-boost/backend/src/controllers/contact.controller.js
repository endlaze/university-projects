const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
  host: process.env.STMP_HOST,
  port: process.env.STMP_PORT,
  auth: {
    user: process.env.STMP_USER,
    pass: process.env.STMP_KEY
  }
})

exports.sendQuestion = (req, res) => {
  let { name, email, message } = req.body

  const msgInfo = {
    from: process.env.MAILER_EMAIL,
    to: process.env.SUPPORT_EMAIL,
    subject: `Nueva consulta de: ${name}`,
    text: ` Nombre del remitente: ${name} \n Email del remitente: ${email}\n Mensaje del remitente: ${message}`
  }

  transport.sendMail(msgInfo, (err, info) => {
    if (err) {
      res.status(500).send({ message: 'No se pudo enviar su mensaje' })
    } else {
      res.status(200).send({ message: 'Su mensaje ha sido enviado correctamente' })
    }
  })
}