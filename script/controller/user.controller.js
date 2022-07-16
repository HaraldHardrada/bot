const db = require('../db.js')

class UserController {
    async createUser(req, res) {
        const {name, telegram_id} = req.body
        const newPerson = await db.query(`INSERT INTO person (name, telegram_id) values ($1, $2) RETURNING *`, [name, telegram_id])
        res.json(newPerson.rows[0])
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM person')
        res.json(users.rows)
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query('SELECT * FROM person where id = $1', [id])
        res.json(user.rows)
    }

    async updateUser(req, res) {
        const {id, name, telegram_id} = req.body
        const user = await  db.query('UPDATE person set name = $1, telegram_id = $2 where id = $3 RETURNING *',
            [name, telegram_id, id])
    res.json(user.rows)
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM person where id = $1', [id])
        res.json(user.rows)
    }
}

module.exports = new UserController();