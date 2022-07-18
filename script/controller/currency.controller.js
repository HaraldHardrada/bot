const db = require('../db.js')

class CurrencyController {
    async addCurrency(req) {
        const {symbol, userId} = req;
        await db.query(`INSERT INTO currencies (symbol, user_id) values ($1, $2) RETURNING *`, [symbol, userId])
        return console.log(`currency was successful added to user ${userId}`)
    }

    async getCurrenciesByUser(req, res) {
        const id = req.query.id;
        const currencies = await db.query(`SELECT * FROM currencies WHERE user_id = $1`, [id]);
        res.json(currencies.rows)

    }

    async deleteUserCurrency(req, res) {
        const id = req.params.id;
        const currency = await db.query(`DELETE FROM currencies where id = $1`, [id])
        res.json(currency.rows)
    }

    async checkSubscription(req) {
        const {symbol, userId} = req;
        const query = await db.query(`SELECT * FROM currencies WHERE user_id = $1 AND symbol = $2`, [userId, symbol]);
        return query.rows.length !== 0
    }
}


module.exports = new CurrencyController();