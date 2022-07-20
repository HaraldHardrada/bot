const CURRENCIES = require('../currencies')

//TODO: -исправить костыли
const getUserId = (ctx) => {
    try {
        return +ctx.update.callback_query.from.id;
    } catch (error) {
        return +ctx.update.message.from.id;
    }
}

const getSymbol = (ctx) => {
    try {
        return CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
    } catch (error) {
        return ctx.update.message.text;
    }
}

module.exports = {getUserId, getSymbol}