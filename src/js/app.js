const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: 'pruebasesme456@gmail.com',
      clientId: '259075844007-h88v5dr99lk4g6qka3ide3u43p92f5pg.apps.googleusercontent.com',
      clientSecret: 'vIyydWpuTJWGS62hr2kN88tD'
    })
  }
});

let mailOptions = {
  from: 'EasyVisit <pruebasesme456@gmail.com>',
  to: 'esme.riveroh@gmail.com',
  subject: 'Correo de prueba',
  text: 'Este es un correo de prueba'
};

transporter.sendMail(mailOptions, function(err, res) {
  if (err) {
    console.log('err' + err);
  } else {
    console.log('correo enviado');
  }
});