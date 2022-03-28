<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center"> LOGIN </v-card>
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

            <v-btn color="success" class="mr-4 mt-2" @click="createTask()">
              SAVE
            </v-btn>
          </v-form>
          <TaskTable />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="logout()"> LOGOUT </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
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
      try {
        const res = await this.$store.dispatch("task/createTask", this.task);
        if (res.status == 201) {
          this.resetValidation();
        }
      } catch (err) {}
    },
    async logout() {
      await this.$store.dispatch("auth/logout");
    },
    resetValidation() {
      this.$v.$reset();
      this.task.name = "";
      this.task.note = "";
    },
  },
};
</script>
