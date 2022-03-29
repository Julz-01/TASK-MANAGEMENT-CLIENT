export default function ({ $axios, redirect }) {
    return $axios.get('/auth/check', { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            localStorage.removeItem("access_token");
            redirect('/')
        })
}