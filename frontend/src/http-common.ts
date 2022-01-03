import axios from "axios";
import * as process from "process";
let url : string=""
console.log(process.env.NODE_ENV)
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    url = "https://projet-awi-sheets.herokuapp.com/"
} else {
    url = "http://localhost:4442/"
    //production
}
export default axios.create({
    baseURL: url,
    headers: {
        "Content-type": "application/json"
    }
});