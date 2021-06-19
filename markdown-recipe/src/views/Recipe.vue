<template>
    <div>
        <section>
            <div v-show="!edit">
                <br />
                <br />
                <h1>{{ recipe.recipeTitle }}</h1>
                <h3>created by {{ recipe.chef.chefName }}</h3>
                <div
                    class="text-center"
                    v-html="formatSteps(recipe.recipeIngredients)"
                />
                <div v-html="formatSteps(recipe.recipeSteps)" />
                <div>
                    <b-button
                        v-show="
                            chef
                                ? chef._id === recipe.chef._id
                                    ? true
                                    : false
                                : false
                        "
                        href=""
                        variant="secondary"
                        @click="editForm"
                        >Edit</b-button
                    >
                    <b-button
                        v-show="
                            chef
                                ? chef._id === recipe.chef._id
                                    ? true
                                    : false
                                : false
                        "
                        href=""
                        variant="danger"
                        @click="deleteRecipe"
                        >Delete</b-button
                    >
                </div>
            </div>
            <div v-show="edit">
                <b-form>
                    <b-form-group class="mx-2 my-4">
                        <b-form-input
                            v-model="recipeTitle"
                            placeholder="Recipe Title"
                            required
                            :value="'bill'"
                        />
                    </b-form-group>
                    <b-form-group class="mx-2 my-4">
                        <b-form-textarea
                            v-model="recipeIngredients"
                            placeholder="Ingredients"
                            required
                            :value="'bill'"
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
                        <b-button
                            type="button"
                            @click="closeForm"
                            class="button"
                        >
                            Close
                        </b-button>
                        <b-button
                            type="submit"
                            @click="updateRecipe"
                            class="button button-primary right"
                        >
                            Update Recipe
                        </b-button>
                    </b-form-group>
                </b-form>
            </div>
        </section>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";
const marked = require("marked");
export default {
    name: "Recipe",
    data() {
        return {
            recipeTitle: "",
            recipeIngredients: "",
            recipeSteps: "",
            recipeType: "Appetizer",
            canEditForm: false,
            recipe: {},
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
    computed: {
        chef() {
            return this.$root.$data.chef;
        },
        edit() {
            return this.canEditForm;
        }
    },
    created() {
        this.getRecipe();
    },
    methods: {
        editForm() {
            this.canEditForm = true;
        },
        closeForm() {
            this.canEditForm = false;
        },

        async getRecipe() {
            try {
                this.response = await axios.get(
                    `/api/recipes/${this.$route.params._id}`
                );
                this.recipe = this.response.data;
                this.recipeTitle = this.recipe.recipeTitle;
                this.recipeIngredients = this.recipe.recipeIngredients;
                this.recipeSteps = this.recipe.recipeSteps;
                this.recipeType = this.recipe.recipeSteps;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async updateRecipe() {
            try {
                this.recipe.recipeTitle = this.recipeTitle;
                this.recipe.recipeIngredients = this.recipeIngredients;
                this.recipe.recipeSteps = this.recipeSteps;
                this.recipe.recipeType = this.recipeType;
                this.response = await axios.put(
                    `/api/recipes/${this.$route.params._id}`,
                    this.recipe
                );

                this.closeForm();
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async deleteRecipe() {
            try {
                this.response = await axios.delete(
                    `/api/recipes/${this.$route.params._id}`
                );
                this.recipe = {};
                this.recipeTitle = "";
                this.recipeIngredients = "";
                this.recipeSteps = "";
                this.recipeType = "";
                this.$router.push("/");
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        formatSteps(text) {
            if (text) {
                return marked(text);
            }
            return "";
        }
    }
};
</script>

<style scoped>
li {
    text-align: start !important;
}
</style>
