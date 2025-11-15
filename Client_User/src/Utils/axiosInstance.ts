import axios from "axios"

export const axiosIntance = axios.create({
    withCredentials: false,
    baseURL: "http://localhost:5000/api/"
});
