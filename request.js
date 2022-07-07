//надо сделать axios instance - отдельный файл, где будет axios
//внутри axios будет актуальный api ключ
//посмотреть про модули exports, можно ли туда запихать дохуя функций
//разобраться с GitHub
//разобраться с Heroku

const axios = require('axios')
const express = require('express');
const app = express();


module.exports = async (text) => {
    try {
        const result = await axios.get(`https://rest.coinapi.io/v1/exchangerate/${text}/USD`, {headers: {'X-CoinAPI-Key': '13F314D3-41C2-4549-ACC1-82E039EF323D'}})
        return result.data.rate;
    }catch (error){
        console.log(error);
    }
};








