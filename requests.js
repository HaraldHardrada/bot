const axios = require('./axios')

const express = require('express');
const CURRENCIES = require("./currencies");
const app = express(); //поместить на Heroku



const getCurrency = async (text) => {
    try {
        const result = await axios.get(`/exchangerate/${text}/USD`)
            //{headers: {'X-CoinAPI-Key': '13F314D3-41C2-4549-ACC1-82E039EF323D'}})
        return result.data.rate;
    }catch (error){
        console.log(error);
    }
};

const getAllCurrencies = async () => {
    try {
        //тут получается массив формата [{}, {}, {}], нужно его отфильтровать,
        // чтоб курсы только тех валют что есть CURRENCIES
    const result = await axios.get(`/assets`)


    } catch (error){
        console.log(error);
    }
};

module.exports = {getCurrency, getAllCurrencies}
