export default function ({ $axios, redirect }) {
    if (localStorage.getItem("access_token") !== null) {
        try {
            return $axios.get('/auth/check', { headers: { 'Authorization': `Bearer ${localStorage.getItem("access_token")}` } })
                .then(res => {
                    if (res.status === 200) {
                        redirect('/user/dashboard')
                    }
                })
                .catch(err => {
                    localStorage.removeItem("access_token");
                    window.location.replace("/");
                })
        } catch (err) {

        }

    }
}