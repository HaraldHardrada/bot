const requests = require('./requests')
const arrayHelper = require("../helpers/arrays");
const CURRENCIES = require("../currencies");


const sendOneRate = async (text) => {
    const result = await requests.getCurrency(text);

    return result.data.rate;
}

const sendAllRates = async () => {
    const req = await requests.getAllCurrencies();

    return arrayHelper.makeList(req, CURRENCIES);
}

const sendSubRates = async (ctx) => {
    const userSubscriptions = await requests.getSubCurrencies(ctx);

    if (userSubscriptions === null) return;

    const req = await requests.getAllCurrencies();

    return arrayHelper.makeList(req, userSubscriptions);
}

module.exports = {sendOneRate, sendAllRates, sendSubRates}