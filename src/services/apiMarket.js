const { default: axios } = require("axios");

const apiMarket = axios.create({
    baseURL: 'https://fakestoreapi.com'
})

export default apiMarket