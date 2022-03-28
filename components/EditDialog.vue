<template>
  <div class="text-center">
    <v-dialog v-model="dialog[data.id]" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          small
          @click="findTask(data.id)"
        >
          EDIT
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ data.name }}
        </v-card-title>

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
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="$set(dialog, data.id, false)">
            Close
          </v-btn>
          <v-btn color="primary" text @click="updateTask(data.id)">
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  props: ["data"],
  mixins: [validationMixin],
  validations: {
    task: {
      name: { required, minLength: minLength(2) },
      note: { required },
    },
  },
  data() {
    return {
      dialog: [],
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
    async findTask(id) {
      try {
        const res = await this.$store.dispatch("task/findTask", id);
        if (res.status === 200) {
          this.task.name = res.data.name;
          this.task.note = res.data.note;
        }
      } catch (err) {
        console.error(err.response);
      }
    },
    async updateTask(id) {
      try {
        const res = await this.$store.dispatch("task/updateTask", {
          id: id,
          data: this.task,
        });

        if (res.status === 200) {
          this.dialog[id] = false;
        }
      } catch (err) {
        console.err(err)
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