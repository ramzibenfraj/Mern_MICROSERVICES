// Appel des packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")
const router = express.Router(); // Créez un routeur Express.
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");

// Lancer le module express avec le format JSON
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3006',
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

    

    const mailRoute = require('./routes/api/contact');
    app.use('/', mailRoute);




    //Démarrer le serveur
    const port = process.env.PORT || 3006;
    app.listen(port, () => console.log(`Bien connecté au serveur via le port ${port}`));