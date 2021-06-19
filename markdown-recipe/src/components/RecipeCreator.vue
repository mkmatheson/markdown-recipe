<template>
    <div>
        <div>
            <b-form @submit.prevent="upload">
                <b-form-group class="mx-2 my-4">
                    <b-form-input
                        v-model="recipeTitle"
                        placeholder="Recipe Title"
                        required
                    />
                </b-form-group>
                <b-form-group class="mx-2 my-4">
                    <b-form-textarea
                        v-model="recipeIngredients"
                        placeholder="Ingredients"
                        required
                    ></b-form-textarea>
                </b-form-group>
                <b-form-group class="mx-2 my-4">
                    <b-form-textarea
                        v-model="recipeSteps"
                        placeholder="Steps"
                        required
                    ></b-form-textarea>
                </b-form-group>
                <b-form-group class="mx-2 my-4">
                    <b-form-select
                        v-model="recipeType"
                        :options="types"
                        required
                    ></b-form-select>
                </b-form-group>
                <b-form-group class="mx-2 my-4">
                    <button type="button" @click="close" class="button">
                        Close
                    </button>
                    <button type="submit" class="button button-primary right">
                        Upload Recipe
                    </button>
                </b-form-group>
            </b-form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "RecipeCreator",
    props: {
        show: Boolean
    },
    data() {
        return {
            recipeTitle: "",
            recipeIngredients: "",
            recipeSteps: "",
            recipeType: "Appetizer",
            error: "",
            types: [
                {value: "Appetizer", text: "Appetizer"},
                {value: "Salad", text: "Salad"},
                {value: "Soup", text: "Soup"},
                {value: "Entrée", text: "Entrée"},
                {value: "Dessert", text: "Dessert"},
                {value: "Breakfast", text: "Breakfast"},
                {value: "Other", text: "Other"}
            ]
        };
    },
    methods: {
        close() {
            this.$emit("closeModal");
        },

        async upload() {
            try {
                await axios.post("/api/recipes", {
                    recipeTitle: this.recipeTitle,
                    recipeIngredients: this.recipeIngredients,
                    recipeSteps: this.recipeSteps,
                    recipeType: this.recipeType
                });
                this.recipeTitle = "";
                this.recipeIngredients = "";
                this.recipeSteps = "";
                this.recipeType = "Appetizer";
                this.$emit("closeModal");
            } catch (error) {
                this.error = "Error: " + error.response.data.message;
            }
        }
    }
};
</script>
