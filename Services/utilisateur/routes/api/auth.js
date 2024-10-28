const express = require('express');
const router = express.Router(); // Créez un routeur Express.

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const auth = require("../../middleware/auth"); 
const User = require('../../models/User'); 
const secretKey = config.get("jwtSecret");


router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter both email and password." });
    }

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(400).json({ msg: "Please register if you are a new user" });
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ msg: "Incorrect password or username" });
            }

            jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: '7d' },
                (err, token) => {
                    if (err) throw err;

                    res
                        .cookie("token", token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                        })
                        .json({
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
router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
});
  


module.exports = router; 

