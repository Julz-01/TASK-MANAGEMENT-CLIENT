<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center"> TASK MANAGEMENT </v-card>
      <v-card>
        <v-card-title class="headline"> </v-card-title>
        <v-card-text>
          <v-form ref="form" @keydown="error.clear()">
            <v-text-field
              v-model="task.name"
              :error-messages="taskNameErrors"
              label="Name"
              required
              @input="$v.task.name.$touch()"
              @blur="$v.task.name.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="task.note"
              label="Note"
              required
              :error-messages="taskNoteError"
              @input="$v.task.note.$touch()"
              @blur="$v.task.note.$touch()"
            ></v-text-field>

            <v-btn
              color="success"
              class="mr-4 mt-2"
              :disabled="task.name == '' ? true : false"
              @click="createTask()"
            >
              SAVE
            </v-btn>
          </v-form>
          <TaskTable />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" :loading="isLoading" @click="logout()">
            LOGOUT
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
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
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  middleware: "auth-check",
  mixins: [validationMixin],
  validations: {
    task: {
      name: { required, minLength: minLength(2) },
      note: { required },
    },
  },
  layout: "default",
  data() {
    return {
      task: {
        name: "",
        note: "",
      },
      snackbar: false,
      sb_color: "",
      msg: "",
      isLoading: false,
    };
  },
  computed: {
    taskNameErrors() {
      const errors = [];
      if (!this.$v.task.name.$dirty) return errors;
      !this.$v.task.name.minLength &&
        errors.push("name must be atleast 2 characters long");
      !this.$v.task.name.required && errors.push("name is required.");
      return errors;
    },
    taskNoteError() {
      const errors = [];
      if (!this.$v.task.note.$dirty) return errors;
      !this.$v.task.note.required && errors.push("Note is required");
      return errors;
    },
  },
  methods: {
    async createTask() {
      this.isLoading = true;
      try {
        const res = await this.$store.dispatch("task/createTask", this.task);
        if (res.status == 201) {
          this.msg = "SUCCESS!";
          this.sb_color = "green darken-3";
          this.snackbar = true;
          this.isLoading = false;
          await this.resetValidation();
        }
      } catch (err) {
        this.msg = "SOMETHING WENT WRONG";
        this.sb_color = "red";
        this.snackbar = true;
        this.isLoading = false;
      }
    },
    async logout() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("auth/logout");
      } catch (err) {
        this.isLoading = false;
      }
    },
    resetValidation() {
      this.$v.$reset();
      this.task.name = "";
      this.task.note = "";
    },
  },
};
</script>
