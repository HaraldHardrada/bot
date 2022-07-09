const axios = require('./axios')

const express = require('express');
const CURRENCIES = require("./currencies");
const app = express(); //поместить на Heroku
let count = 0;

const getCurrency = async (text) => {
    try {
        const result = await axios.get(`/exchangerate/${text}/USD`)
        count++;
        return result.data.rate;
    } catch (error) {
        console.log(error);
    }
};

const getAllCurrencies = async () => {
    try {
        const result = await axios.get(`/assets`);
        count++;
        return  result.data.filter((item) => CURRENCIES.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {getCurrency, getAllCurrencies, count}
