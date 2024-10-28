const express = require('express');
const router = express.Router(); // Créez un routeur Express.

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth"); // Middleware d'authentification.
const User = require('../../models/User'); // Modèle d'utilisateur.


router.post("/register", (req, res) => {


    //res.send("test");
    let { name, email, password, role = 'user' } = req.body;

    // Vérification des données requises.
    if (!name || !email || !password || !role) {
        return res.status(400).send({ msg: "please enter all data" });
    }

    // Vérification si l'email existe déjà.
    User.findOne({ email: email }).then((user) => {
        if (user) {
            return res.status(400).send({ msg: "Email already exist" });
        }
        let newUser = new User({ name, email, password, role });

        // Chiffrement du pass.
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;

                // Sauvegarde au mongo.
                newUser.save().then((user) => {
                    // Génération d'un tokenn.
                    jwt.sign(
                        { id: user.id },
                        config.get("jwtSecret"),
                        {
                            expiresIn: config.get("tokenExpire")
                        },
                        (err, token) => {
                            if (err) throw err;

                            // Envoi de la réponse avec le token et les info de user.
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                },
                            });
                        }
                    );
                });
            });
        });
    });
});
// Route to get all users
router.get("/getallusers", async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find().select('-password'); // Exclude password field

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { name, email, role } = req.body;

        // Find the user by ID and update the fields
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { name, email, role } },
            { new: true } // To get the updated user data
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to delete a user by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router; // Exportez le routeur Express pour une utilisation dans (serveur.js)
