import axios from "axios"

const $http = axios.create({
    baseURL: "./dataset/",
    timeout: 5000,
    params: {
        id: "",
        author: "",
        title: ""
    }
    // headers: {'Authorization': 'none'}
})

export default $http
