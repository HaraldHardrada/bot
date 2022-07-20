const CURRENCIES = require('../currencies')

const getUserId = (ctx) => {
    return ctx.update?.callback_query
        ? +ctx.update.callback_query.from.id
        : +ctx.update.message.from.id
}

const getSymbol = (ctx) => {
    return ctx.update?.callback_query
        ? CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("")
        : ctx.update.message.text
}

module.exports = {getUserId, getSymbol}