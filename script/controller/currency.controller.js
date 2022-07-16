const db = require('../db.js')

class CurrencyController {
    async addCurrency(req, res) {
        const {symbol, userId} = req.body;
        const newCurrency = await db.query(`INSERT INTO currencies (symbol, user_id) values ($1, $2) RETURNING *`, [symbol, userId])
        res.json(newCurrency.rows)
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
}

module.exports = new CurrencyController();