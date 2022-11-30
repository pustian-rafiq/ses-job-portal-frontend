import Axios from "axios";

const axios = Axios.create({
    baseURL: process.env.domain,
    header: {
        "X-Requested-With": "XMLHttpRequest"
    },
    // withCredentials: true
});

export default axios;