<template>
  <div class="text-center">
    <v-dialog v-model="dialog[data.id]" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          class="ml-2"
          small
        >
          Delete
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Delete {{ data.name }} ?
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="$set(dialog, data.id, false)">
            Cancel
          </v-btn>
          <v-btn color="red" text @click="removeTask(data.id)"> REMOVE </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      dialog: [],
    };
  },
  methods: {
    async removeTask(id) {
      try {
        const res = await this.$store.dispatch("task/removeTask", id);
        if (res.status == 200) {
          this.dialog[id] = false;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>