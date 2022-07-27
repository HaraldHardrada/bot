const axios = require('../axios')
const currencyController = require('../controller/currency.controller')

const getCurrency = async (text) => {
    try {
        return await axios.get(`/exchangerate/${text}/USD`)
    } catch (error) {
        console.log(error)
    }
};

const getAllCurrencies = async () => {
    try {
        return await axios.get(`/assets`);
    } catch (error) {
        console.log(error);
    }
};

const getSubCurrencies = async ctx => {
    try {
        const userCurrencies = await currencyController.getCurrenciesByUser(ctx);

        return userCurrencies.length === 0 ? null : userCurrencies;

    } catch (error) {
        console.log(error);
    }
};

module.exports = {getCurrency, getAllCurrencies, getSubCurrencies}
