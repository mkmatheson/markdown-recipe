<template>
    <div>
        <MyRecipes v-if="chef" />
        <Login v-else />
    </div>
</template>
<script>
import MyRecipes from "@/components/MyRecipes.vue";
import Login from "@/components/Login.vue";
import axios from "axios";
export default {
    name: "dashboard",
    components: {
        MyRecipes,
        Login
    },
    async created() {
        try {
            let response = await axios.get("/api/chefs");
            this.$root.$data.chef = response.data.chef;
        } catch (error) {
            this.$root.$data.chef = null;
        }
    },
    computed: {
        chef() {
            return this.$root.$data.chef;
        }
    }
};
</script>
