const axios = require('./axios')
const CURRENCIES = require("./currencies");
const db = require('./db')

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

const getSubCurrencies = async ctx => {

    const userId = +ctx.update.callback_query.from.id
    const request = await db.query(`SELECT * FROM currencies WHERE user_id = $1`, [userId])
    const userCurrencies = request.rows.map(item => item.symbol)

    if (userCurrencies.length === 0) return;
    try {

        const result = await axios.get(`/assets`);

        const userRequest = result.data.filter((item) => userCurrencies.includes(item.asset_id))
            .map((item) => `${item.asset_id}: ${item.price_usd.toFixed(4)} usd`)
            .join("\n")

        return ctx.reply(`List of currencies: \n${userRequest}`);

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getCurrency, getAllCurrencies, getSubCurrencies}
