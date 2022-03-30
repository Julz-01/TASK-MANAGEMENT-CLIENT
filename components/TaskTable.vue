<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="tasks"
      :items-per-page="20"
      class="elevation-1 mt-2"
    >
      <template v-slot:item.status="{ item }">
        <v-chip color="secondary" v-if="item.status == 0"> PENDING </v-chip>
        <v-chip color="green" v-else> DONE </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-inline-flex">
          <v-btn
            color="green"
            :disabled="item.status == 1 ? true : false"
            class="mr-2"
            small
            @click="setAsDone(item.id)"
          >
            SET AS DONE
          </v-btn>
          <EditDialog :data="item" />
          <DeleteDialog :data="item" />
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch() {
    try {
      await this.$store.dispatch("task/findTasks");
    } catch (err) {
      console.error(err);
    }
  },
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
        },
        { text: "Note", value: "note" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapState("task", ["tasks"]),
  },
  methods: {
    async setAsDone(id) {
      try {
        await this.$store.dispatch("task/setAsDone", id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>