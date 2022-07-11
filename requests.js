const {Axios, changeApiKey} = require('./axios')

const express = require('express');
const CURRENCIES = require("./currencies");
const app = express(); //поместить на Heroku


function fixErrors(error){
    if (error.response === 429) changeApiKey();
    if (error.request) console.log(error.request);
    console.log('Error', error.message);
    console.log(error.config)
}


const getCurrency = async (text) => {
    try {
        const result = await Axios.get(`/exchangerate/${text}/USD`)
        return result.data.rate;
    } catch (error) {
        changeApiKey()
        console.log(error)
    }
};

const getAllCurrencies = async () => {
    try {
        const result = await Axios.get(`/assets`);
        return  result.data.filter((item) => CURRENCIES.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n");
    } catch (error) {
        fixErrors(error);
    }
};

module.exports = {getCurrency, getAllCurrencies}
