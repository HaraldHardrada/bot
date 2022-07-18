const db = require('../db.js')
const CURRENCIES = require("../currencies");

//TODO: try ... catch
class CurrencyController {
    async addCurrency(ctx) {
        const symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
        const userId = +ctx.update.callback_query.from.id;

        await db.query(`INSERT INTO currencies (symbol, user_id) values ($1, $2) RETURNING *`, [symbol, userId])
        return console.log(`currency was successfully added to user ${userId}`)
    }

    async getCurrenciesByUser(req, res) {
        const id = req.query.id;
        const currencies = await db.query(`SELECT * FROM currencies WHERE user_id = $1`, [id]);
        res.json(currencies.rows)

    }

    async deleteUserCurrencies(ctx) {
        const userId = +ctx.update.message.from.id;
        await db.query(`DELETE FROM currencies WHERE user_id = $1`, [userId])
        return console.log(`currencies was successfully deleted from user ${userId}`)
    }

    async checkSubscription(ctx) {
        const symbol = CURRENCIES.map((item) => ctx.update.callback_query.message.text.match(item)).join("");
        const userId = +ctx.update.callback_query.from.id;

        const query = await db.query(`SELECT * FROM currencies WHERE user_id = $1 AND symbol = $2`, [userId, symbol]);
        return query.rows.length !== 0
    }
}


module.exports = new CurrencyController();