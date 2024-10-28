// Appel des packages
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const nodemailer = require("nodemailer");

// Lancer le module express avec le format JSON
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS Configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

//Appeler le chemin de connexion
const mongo_url = config.get("mongo_url");

//Permet l'interaction avec MongoDB
mongoose.set("strict", true);
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Bien connecté à MongoDB");

    // Link routes for order service
    const orderRoute = require('./routes/api/orders');
    app.use('/', orderRoute);

    // Démarrer le serveur
    const port = process.env.PORT || 3005;
    app.listen(port, () => console.log(`Bien connecté au serveur via le port ${port}`));
  })
  .catch((err) => console.log(err));
