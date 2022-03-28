const resource = '/tasks'
export default ($axios) => ({
    create(payload) {
        return $axios.post(`${resource}`, payload, { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
    },

    findPending() {
        return $axios.get(`${resource}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
    },

    findOne(id) {
        return $axios.get(`${resource}/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
    },

    update(payload) {
        return $axios.patch(`${resource}/${payload.id}`, payload.data, { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
    },

    setDone(id) {
        return $axios.patch(`${resource}/done/${id}`, { }, { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
    },

    remove(id) {
        return $axios.delete(`${resource}/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
    }
})