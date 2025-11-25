import axios from "axios"

export const axiosIntance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8000/api/"
});
