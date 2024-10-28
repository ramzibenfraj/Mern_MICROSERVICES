// Appel des packages
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");

// Charger les variables d'environnement
dotenv.config();

// Lancer le module express avec le format JSON
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Appeler le chemin de connexion
const mongo_url = process.env.MONGO_URL;

//Permet l'interaction avec MongoDB
mongoose.set("strict", true);
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Bien connecté à MongoDB");
    
    //link users route(require users.js)
    const usersRouter = require('./routes/api/users');
    app.use('/', usersRouter);

    const usersLoginRoute = require('./routes/api/auth');
    app.use('/', usersLoginRoute);

    //Démarrer le serveur
    const port = process.env.PORT || 3002;
    app.listen(port, () => console.log(`Bien connecté au serveur via le port ${port}`));
  })
  .catch((err) => console.log(err));
