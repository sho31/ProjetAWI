import axios from "axios";
import * as process from "process";
let url : string=""
console.log(process.env.NODE_ENV)
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "http://localhost:4442/"
} else {
    url = "https://projet-awi-sheets.herokuapp.com/"
    //production
}
export default axios.create({
    baseURL: url,
    headers: {
        "Content-type": "application/json"
    }
});