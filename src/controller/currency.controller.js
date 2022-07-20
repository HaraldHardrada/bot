const db = require('../db.js')
const CURRENCIES = require("../currencies");
const {getUserId, getSymbol} = require('../helpers/user.info')

class CurrencyController {
    async addCurrency(ctx) {
        try {
            const symbol = getSymbol(ctx);
            const userId = getUserId(ctx);

            await db.query(`INSERT INTO currencies (symbol, user_id) values ($1, $2) RETURNING *`, [symbol, userId])
            return console.log(`currency was successfully added to user ${userId}`)
        } catch (error) {
            console.log(error)
        }
    }

    async getCurrenciesByUser(ctx) {
        try {
            const userId = getUserId(ctx);

            const request = await db.query(`SELECT * FROM currencies WHERE user_id = $1`, [userId])

            return request.rows.map(item => item.symbol)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUserCurrencies(ctx) {
        try {
            const userId = getUserId(ctx);

            await db.query(`DELETE FROM currencies WHERE user_id = $1`, [userId])

            return console.log(`currencies was successfully deleted from user ${userId}`)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteUserCurrency(ctx) {
        try {
            const symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
            const userId = +ctx.update.callback_query.from.id;

            await db.query(`DELETE FROM currencies WHERE symbol = $1 AND user_id = $2 `, [symbol, userId])
            ctx.reply(`You successfully unsubscribed from ${symbol}`)
        } catch (error) {
            console.log(error)
        }
    }

    async checkSubscription(ctx) {
        try {
            const userId = getUserId(ctx);
            const symbol = getSymbol(ctx);

            const query = await db.query(`SELECT * FROM currencies WHERE user_id = $1 AND symbol = $2`, [userId, symbol]);
            return query.rows.length !== 0
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new CurrencyController();