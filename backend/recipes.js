const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const chefs = require("./chefs.js");
const Chef = chefs.model;
const validChef = chefs.valid;

const recipeSchema = new mongoose.Schema({
    chef: {
        type: mongoose.Schema.ObjectId,
        ref: "Chef"
    },
    recipeTitle: String,
    recipeIngredients: String,
    recipeSteps: String,
    recipeType: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

router.post("/", validChef, async (req, res) => {
    if (!req.body) return res.status(400).send({message: "Recipe must exist"});
    const recipe = new Recipe({
        chef: req.chef,
        recipeTitle: req.body.recipeTitle,
        recipeIngredients: req.body.recipeIngredients,
        recipeSteps: req.body.recipeSteps,
        recipeType: req.body.recipeType
    });
    try {
        await recipe.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/", validChef, async (req, res) => {
    try {
        let recipes = await Recipe.find({
            chef: req.chef
        })
            .sort({
                created: -1
            })
            .populate("chef");
        return res.send(recipes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/all", async (req, res) => {
    try {
        let recipes = await Recipe.find()
            .sort({
                created: -1
            })
            .populate("chef");
        return res.send(recipes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.get("/:_id", async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.params._id).populate("chef");
        return res.send(recipe);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.put("/:_id", async (req, res) => {
    try {
        await Recipe.updateOne({_id: req.params._id}, req.body).populate(
            "chef"
        );
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:_id", async (req, res) => {
    try {
        let recipe = await Recipe.findByIdAndDelete(req.params._id).populate(
            "chef"
        );

        return res.send(recipe);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

router.delete("/:_id", async (req, res) => {
    try {
        let recipe = await Recipe.findById(req.recipe._id).populate("chef");
        return res.send(recipe);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Recipe,
    routes: router
};
