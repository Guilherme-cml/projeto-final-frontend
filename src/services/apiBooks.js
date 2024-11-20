const { default: axios } = require("axios");

const apiBooks = axios.create({
    baseURL: 'https://www.googleapis.com/books'
    //baseURL: 'https://fakestoreapi.com'
})

export default apiBooks