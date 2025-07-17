import axios from "axios";

export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'187a021ec38a4b23a11b62d17a5e7cdc'
    }
})