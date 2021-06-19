<template>
    <div>
        <div>
            <b-form class="m-5">
                <b-form-group>
                    <legend>Become a chef today!</legend>
                    <b-form-input
                        size="md"
                        placeholder="First Name"
                        v-model="firstName"
                    />
                    <b-form-input
                        size="md"
                        placeholder="Last Name"
                        v-model="lastName"
                    />
                </b-form-group>
                <b-form-group>
                    <b-form-input
                        size="md"
                        placeholder="Chef Name"
                        v-model="chefName"
                    />
                    <b-form-input
                        size="md"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                    />
                </b-form-group>
                <b-form-group>
                    <b-button
                        type="submit"
                        class="b-button b-button-primary"
                        @click.prevent="register"
                    >
                        Register
                    </b-button>
                </b-form-group>
            </b-form>
            <p v-if="error" class="error">{{ error }}</p>
            <b-form class="m-5 space-above">
                <b-form-group>
                    <legend>Login</legend>
                    <b-form-input
                        size="md"
                        placeholder="Chef Name"
                        v-model="chefNameLogin"
                    />
                    <b-form-input
                        size="md"
                        type="password"
                        placeholder="Password"
                        v-model="passwordLogin"
                    />
                </b-form-group>
                <b-form-group>
                    <b-button
                        type="submit"
                        class="b-button b-button-primary"
                        @click.prevent="login"
                    >
                        Login
                    </b-button>
                </b-form-group>
            </b-form>
            <p v-if="errorLogin" class="error">{{ errorLogin }}</p>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "HomePage",
    data() {
        return {
            firstName: "",
            lastName: "",
            chefName: "",
            chefNameLogin: "",
            password: "",
            passwordLogin: "",
            error: "",
            errorLogin: ""
        };
    },
    methods: {
        async register() {
            console.log(this);
            this.error = "";
            this.errorLogin = "";
            if (
                !this.firstName ||
                !this.lastName ||
                !this.chefName ||
                !this.password
            )
                return;
            try {
                let response = await axios.post("/api/chefs", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    chefName: this.chefName,
                    password: this.password
                });
                this.$root.$data.chef = response.data.chef;
            } catch (error) {
                this.error = error.response.data.message;
                this.$root.$data.chef = null;
            }
        },
        async login() {
            this.error = "";
            this.errorLogin = "";
            if (!this.chefNameLogin || !this.passwordLogin) return;
            try {
                let response = await axios.post("/api/chefs/login", {
                    chefName: this.chefNameLogin,
                    password: this.passwordLogin
                });
                this.$root.$data.chef = response.data.chef;
            } catch (error) {
                this.errorLogin = "Error: " + error.response.data.message;
                this.$root.$data.chef = null;
            }
        }
    }
};
</script>
