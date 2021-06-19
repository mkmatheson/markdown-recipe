<template>
    <div>
        <div>
            <h2>
                {{ chef.firstName }} {{ chef.lastName }}
            </h2>
        </div>
        <b-modal size="xl" title="Add New Recipe" id="recipe-modal" hide-footer>
            <recipe-creator @closeModal="closeModal" />
        </b-modal>
        <b-button @click="openModal">Create New Recipe</b-button>
        <recipes :recipes="recipes" :pageName="'My Recipes'" />
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";
import RecipeCreator from "@/components/RecipeCreator.vue";
import Recipes from "./Recipes.vue";
export default {
    components: {Recipes, RecipeCreator},
    name: "MyRecipes",
    data() {
        return {
            show: false,
            recipes: [],
            error: ""
        };
    },
    created() {
        this.getRecipes();
    },
    computed: {
        chef() {
            return this.$root.$data.chef;
        }
    },
    methods: {
    
        async getRecipes() {
            try {
                this.response = await axios.get("/api/recipes");
                console.log(this.response);
                this.recipes = this.response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        closeModal() {
            this.$bvModal.hide("recipe-modal");
            this.getRecipes();
        },
        openModal() {
            this.$bvModal.show("recipe-modal");
        }
    }
};
</script>
