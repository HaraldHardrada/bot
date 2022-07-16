const axios = require('./axios')
const CURRENCIES = require("./currencies");

const {userCurrencies} = require("./bot_control/commands")

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
        const result = await axios.get(`/assets`);

        return result.data.filter((item) => CURRENCIES.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n");
    } catch (error) {
        console.log(error);
    }
};

const getSubCurrencies = async () => {
    console.log('in function', userCurrencies);
    if (userCurrencies.length === 0) return;

    try {
        const result = await axios.get(`/assets`);

        return result.data.filter((item) => userCurrencies.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {getCurrency, getAllCurrencies, getSubCurrencies}
