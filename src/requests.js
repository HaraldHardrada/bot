const axios = require('./axios')
const CURRENCIES = require("./currencies");
const currencyController = require('./controller/currency.controller')

const ArrayFilter = require('./helpers/arrays')

const getCurrency = async (text) => {
    try {
        const result = await axios.get(`/exchangerate/${text}/USD`)

        return result.data.rate;
    } catch (error) {
        console.log(error)
    }
};

const getAllCurrencies = async () => {
    try {
        const request = await axios.get(`/assets`);

        return ArrayFilter.filterRequest(request, CURRENCIES);
    } catch (error) {
        console.log(error);
    }
};

const getSubCurrencies = async ctx => {
    try {
        const userCurrencies = await currencyController.getCurrenciesByUser(ctx, 'callback');

        if (userCurrencies.length === 0) return;

        const request = await axios.get(`/assets`);
        const userSubscriptions = ArrayFilter.filterRequest(request, userCurrencies);

        return ctx.reply(`List of currencies: \n${userSubscriptions}`);

    } catch (error) {
        console.log(error);
    }
};

module.exports = {getCurrency, getAllCurrencies, getSubCurrencies}
