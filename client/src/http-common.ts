import axios from "axios";
const devConfig ="http://localhost:5000/"
const proConfig =""
console.log("config", process.env.NODE_ENV)
export default axios.create({
    baseURL: process.env.NODE_ENV === "production" ? proConfig : devConfig ,
    headers: {
        "Content-type": "application/json"
    }
});