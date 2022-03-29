export default {
    state: () => ({

    }),
    getters: {},
    mutations: {

    },
    actions: {
        async login({ }, payload) {
            const res = await this.$repositories.auth.login(payload);
            if (res.status === 201) {
                localStorage.setItem('access_token', res.data.access_token)
            }
            return res;

        },
        
        logout({ }) {
            localStorage.removeItem('access_token');
            setInterval(() => {
                localStorage.removeItem("access_token");
                location.href = "/";
            }, 1500);
        }
    }
}