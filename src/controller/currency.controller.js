const db = require('../db.js')
const CURRENCIES = require("../currencies");

//TODO: - сделать универсальный метод определения типа запроса message или callback_query
//      - и использовать его везде, потому что заебала хуйня ломаться, маму ее трахал
//TODO: try ... catch
class CurrencyController {
    async addCurrency(ctx) {
        const symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
        const userId = +ctx.update.callback_query.from.id;

        await db.query(`INSERT INTO currencies (symbol, user_id) values ($1, $2) RETURNING *`, [symbol, userId])
        return console.log(`currency was successfully added to user ${userId}`)
    }

    async getCurrenciesByUser(ctx, type = 'message') {
        let userId;

        if (type === 'callback') userId = +ctx.update.callback_query.from.id;
        if (type === 'message') userId = +ctx.update.message.from.id;

        const request = await db.query(`SELECT * FROM currencies WHERE user_id = $1`, [userId])

        return request.rows.map(item => item.symbol)
    }

    async deleteUserCurrencies(ctx) {
        const userId = +ctx.update.message.from.id;
        await db.query(`DELETE FROM currencies WHERE user_id = $1`, [userId])
        return console.log(`currencies was successfully deleted from user ${userId}`)
    }

    async deleteUserCurrency(ctx) {
        const symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
        const userId = +ctx.update.callback_query.from.id;

        await db.query(`DELETE FROM currencies WHERE symbol = $1 AND user_id = $2 `, [symbol, userId])
        ctx.reply(`You successfully unsubscribed from ${symbol}`)
    }

    async checkSubscription(ctx, type = 'message') {
        let symbol = ctx.update.message.text;
        let userId = +ctx.update.message.from.id;

        console.log(ctx.update)
        if (type === 'callback') {
            symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
            userId = +ctx.update.callback_query.from.id;
        }
        const query = await db.query(`SELECT * FROM currencies WHERE user_id = $1 AND symbol = $2`, [userId, symbol]);
        return query.rows.length !== 0
    }
}

module.exports = new CurrencyController();