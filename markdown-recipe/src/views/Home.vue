<template>
    <div>
        <recipes :recipes="recipes" :pageName="'Public Recipes'" />
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
import axios from "axios";
import Recipes from "@/components/Recipes.vue";
export default {
    name: "Home",
    components: {
        Recipes
    },
    data() {
        return {
            recipes: [],
            error: ""
        };
    },
    created() {
        this.getRecipes();
    },
    methods: {
        async getRecipes() {
            try {
                let response = await axios.get("/api/recipes/all");
                this.recipes = response.data;
            } catch (error) {
                this.error = error.response.data.message;
            }
        }
    }
};
</script>
