const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");


router.post("/send-email", (req, res) => {
    const { name, email, message } = req.body;
  
    // Configurer le transporter pour l'envoi d'e-mail via Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Service de messagerie (changez cela en fonction de votre service)
      auth: {
        user: "rbenfraj111@gmail.com", // Votre adresse e-mail Gmail
        pass: "xwdr ksya uvmc muon", // Votre mot de passe Gmail
      },
    });
  
    // Options de l'e-mail à envoyer
    const mailOptions = {
      from: "rbenfraj111@gmail.com",
      to: "rbenfraj111@gmail.com", // L'adresse e-mail destinataire
      subject: `Nouveau message de ${name} (${email})`,
      text: message,
    };
  
    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
        res.status(500).send("Erreur lors de l'envoi de l'e-mail");
      } else {
        console.log("E-mail envoyé:", info.response);
        res.status(200).send("E-mail envoyé avec succès");
      }
    });
});

module.exports = router;
  