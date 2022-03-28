export default function ({ $axios, redirect }) {
    return $axios.get('/auth/check', { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
        .then(res => {
            console.log(res)
            if (res.status === 401) {
                localStorage.removeItem("access_token");
                redirect('/')
            }
        })
        .catch(err => {
            console.error(err)
            localStorage.removeItem("access_token");
            redirect('/')
        })
}