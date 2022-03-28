export default {
    state: () => ({
        tasks: [],
        task: []
    }),
    getters: {

    },
    mutations: {
        MUTATE_TASKS(state, payload) {
            state.tasks = payload;
        },
        MUTATE_TASK(state, payload) {
            state.task = payload;
        }
    },
    actions: {
        async createTask({ dispatch }, payload) {
            const res = await this.$repositories.task.create(payload);
            if (res.status === 201) {
                dispatch('findTasks')
            }
            return res;
        },

        async findTasks({ commit }) {
            const res = await this.$repositories.task.findPending();
            if (res.status === 200) {
                commit('MUTATE_TASKS', res.data)
            }
            return res;
        },

        async findTask({ commit }, payload) {
            const res = await this.$repositories.task.findOne(payload);
            if (res.status === 200) {
                commit('MUTATE_TASK', res.data)
            }

            return res;
        },

        async updateTask({ dispatch }, payload) {
            const res = await this.$repositories.task.update(payload);
            if (res.status === 200) {
                dispatch('findTasks')
            }

            return res;
        },

        async setAsDone({ dispatch }, payload) {
            const res = await this.$repositories.task.setDone(payload);
            if (res.status === 200) {
                dispatch('findTasks')
            }

            return res;
        },

        async removeTask({ dispatch }, payload) {
            const res = await this.$repositories.task.remove(payload);
            if (res.status === 200) {
                dispatch('findTasks')
            }

            return res;
        }
    }
}