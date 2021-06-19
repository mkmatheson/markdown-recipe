const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");

const router = express.Router();

const chefSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    chefName: String,
    password: String
});

chefSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const hash = await argon2.hash(this.password);
        this.password = hash;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

chefSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await argon2.verify(this.password, password);
        return isMatch;
    } catch (error) {
        return false;
    }
};

chefSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

const Chef = mongoose.model("Chef", chefSchema);

/* Middleware */

// middleware function to check for logged-in chefs
const validChef = async (req, res, next) => {
    if (!req.session.chefID)
        return res.status(403).send({
            message: "not logged in"
        });
    try {
        const chef = await Chef.findOne({
            _id: req.session.chefID
        });
        if (!chef) {
            return res.status(403).send({
                message: "not logged in"
            });
        }
        req.chef = chef;
    } catch (error) {
        return res.status(403).send({
            message: "not logged in"
        });
    }
    next();
};

router.post("/", async (req, res) => {
    if (
        !req.body.firstName ||
        !req.body.lastName ||
        !req.body.chefName ||
        !req.body.password
    )
        return res.status(400).send({
            message:
                "first name, last name, chef name and password are required"
        });

    try {
        const existingChef = await Chef.findOne({
            chefName: req.body.chefName
        });
        if (existingChef)
            return res.status(403).send({
                message: "chef already exists"
            });

        const chef = new Chef({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            chefName: req.body.chefName,
            password: req.body.password
        });
        await chef.save();
        req.session.chefID = chef._id;

        return res.send({
            chef: chef
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.post("/login", async (req, res) => {
    if (!req.body.chefName || !req.body.password) return res.sendStatus(400);

    try {
        const chef = await Chef.findOne({
            chefName: req.body.chefName
        });
        if (!chef)
            return res.status(403).send({
                message: "chefName or password is wrong"
            });

        if (!(await chef.comparePassword(req.body.password)))
            return res.status(403).send({
                message: "chef username or password is wrong"
            });

        req.session.chefID = chef._id;

        return res.send({
            chef: chef
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/", validChef, async (req, res) => {
    try {
        res.send({
            chef: req.chef
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/", validChef, async (req, res) => {
    try {
        req.session = null;
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: Chef,
    valid: validChef
};
