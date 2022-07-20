const CURRENCIES = require('../currencies')

const getUserId = (ctx) => {
    let userId = +ctx.update.callback_query.from.id;
    if (userId === undefined) userId = +ctx.update.message.from.id;
    return userId;
}

const getSymbol = (ctx) => {
    let symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
    if (symbol === undefined) symbol = ctx.update.message.text;
    return symbol;
}

module.exports = {getUserId, getSymbol}