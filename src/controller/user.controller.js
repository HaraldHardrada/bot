const db = require("../db.js");
const {getUserId} = require('../helpers/user.info')

class UserController {
    async createUser(ctx) {
        try {
            const name = ctx.update.message.from.first_name;
            const telegram_id = getUserId(ctx);

            await db.query(`INSERT INTO person (name, telegram_id) values ($1, $2) RETURNING *`, [name, telegram_id]);
            return console.log(`User ${name} was successfully added`);
        } catch (error) {
            console.log(error)
        }
    }

    //TODO: - подумать нужны ли мне вообще методы getUsers, getOneUser
    async getUsers(req, res) {
        const users = await db.query("SELECT * FROM person");
        res.json(users.rows);
    }

    async getOneUser(req, res) {
        const id = req.params.id;
        const user = await db.query("SELECT * FROM person where id = $1", [id]);
        res.json(user.rows);
    }

    async deleteUser(ctx) {
        try {
            const telegram_id = getUserId(ctx);
            await db.query("DELETE FROM person where telegram_id = $1", [telegram_id]);
            console.log(`User ${telegram_id} is successfully deleted`)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new UserController();