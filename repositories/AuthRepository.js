
const resource = '/auth';
export default ($axios) => ({
    login(payload) {
        return $axios.post(`${resource}/login`, payload)
    },
})

