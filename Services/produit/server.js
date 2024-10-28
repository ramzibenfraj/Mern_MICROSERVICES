// server.js - Product Service
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

// Initialize the Express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS Configuration
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
}));

// Connect to MongoDB
const mongo_url = config.get("mongo_url");

mongoose.set("strict", true);
mongoose
  .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    // Link routes for product service
    const produitRoute = require('./routes/api/produit');
    app.use('/', produitRoute);

    const catRoute = require('./routes/api/categories');
    app.use('/', catRoute);

    // Start the server for the product service
    const port = process.env.PORT || 3003;
    app.listen(port, () => console.log(`Product service running on port ${port}`));
  })
  .catch((err) => console.log(err));
