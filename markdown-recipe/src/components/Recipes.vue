<template>
    <span>
        <h1 class="m-4">{{ pageName }}</h1>
        <b-container fluid="lg" class="mb-5">
            <b-row>
                <b-col
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="recipe in recipes"
                    v-bind:key="recipe._id"
                >
                    <b-card
                        :title="recipe.recipeTitle"
                        :footer="formatDate(recipe.created)"
                    >
                        <!-- add a ratings thing -->
                        <b-card-text
                            >Submitted by
                            {{ recipe.chef.chefName }}</b-card-text
                        >
                        <b-card-text v-html="condenseText(formatSteps(recipe))">
                        </b-card-text>

                        <b-button
                            :to="{name: 'Recipe', params: {_id: recipe._id}}"
                            variant="primary"
                            >View Recipe
                        </b-button>

                        
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </span>
</template>

<script>
import moment from "moment";
const marked = require("marked");
export default {
    name: "Recipes",
    props: {
        recipes: Array,
        pageName: String
    },
    computed: {
        chef() {
            return this.$root.$data.chef;
        }
    },
    methods: {
        formatDate(date) {
            if (moment(date).diff(Date.now(), "days") < 15)
                return moment(date).fromNow();
            else return moment(date).format("d MMMM YYYY");
        },
        formatSteps(recipe) {
            if (recipe.recipeSteps) {
                return marked(recipe.recipeSteps);
            }
            return "";
        },
        condenseText(text) {
            if (text.length > 50) return text.slice(0, 50) + "...";
            return text;
        }
    }
};
</script>
