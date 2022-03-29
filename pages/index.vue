<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center"> LOGIN </v-card>
      <v-card>
        <v-card-title class="headline"> </v-card-title>
        <v-card-text>
          <v-form ref="form" @keydown="error.clear()">
            <v-text-field
              v-model="creds.username"
              :error-messages="usernameErrors"
              label="Name"
              required
              @input="$v.creds.username.$touch()"
              @blur="$v.creds.username.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="creds.password"
              label="Quantity"
              required
              type="password"
              :error-messages="pwErrors"
              @input="$v.creds.password.$touch()"
              @blur="$v.creds.password.$touch()"
            ></v-text-field>

            <v-btn
              color="success"
              class="mr-4 mt-2"
              :loading="isLoading"
              @click="login()"
            >
              LOGIN
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        class="text-center"
        :color="sb_color"
        top
        right
        elevation="24"
      >
        <div>
          {{ msg }}
        </div>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  middleware: "login-check",
  mixins: [validationMixin],
  validations: {
    creds: {
      username: { required, minLength: minLength(2) },
      password: { required },
    },
  },
  layout: "login",

  data() {
    return {
      creds: {
        username: "",
        password: "",
      },
      snackbar: false,
      sb_color: "",
      msg: "",
      isLoading: false,
    };
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.creds.username.$dirty) return errors;
      !this.$v.creds.username.minLength &&
        errors.push("username must be atleast 2 characters long");
      !this.$v.creds.username.required && errors.push("Username is required.");
      return errors;
    },
    pwErrors() {
      const errors = [];
      if (!this.$v.creds.password.$dirty) return errors;
      !this.$v.creds.password.required && errors.push("Quantity is required");
      return errors;
    },
  },
  methods: {
    async login() {
      try {
        this.isLoading = true;
        const res = await this.$store.dispatch("auth/login", this.creds);
        if (res.status === 201) {
          this.msg = "SUCCESS!";
          this.sb_color = "green darken-3";
          this.snackbar = true;
          this.isLoading = false;
          setInterval(() => {
            this.$router.push("/user/dashboard");
          }, 1500);
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.msg = err.response.data.message;
          this.sb_color = "red";
          this.snackbar = true;
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
