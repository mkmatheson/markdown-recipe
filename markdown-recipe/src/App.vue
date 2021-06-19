<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-brand href="#" class="mx-4"
                ><strong>Markdown Recipes</strong></b-navbar-brand
            >
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/"
                        ><b-nav-text
                            ><a>Public Recipes</a></b-nav-text
                        ></b-nav-item
                    >
                    <b-nav-item to="dashboard"
                        ><b-nav-text><a>My Recipes</a></b-nav-text></b-nav-item
                    >
                    <b-nav-item v-show="this.$root.$data.chef">
                        <b-nav-text> <a @click="logout">Logout</a></b-nav-text>
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view />
        <b-navbar fixed="bottom" type="dark" variant="info">
            <b-navbar-nav align="end">
                <b-nav-item
                    class="mx-4"
                    href="https://github.com/mkmatheson/markdown-recipe"
                >
                    <b-nav-text
                        ><a>Hours Spent: 9 | Look at my code!</a></b-nav-text
                    >
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "App",
    data() {
        return {
            show: false,
            recipes: [],
            error: ""
        };
    },

    methods: {
        async logout() {
            try {
                await axios.delete("/api/chefs");
                this.$root.$data.chef = null;
            } catch (error) {
                this.$root.$data.chef = null;
            }
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
