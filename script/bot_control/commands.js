const {Markup, Telegraf} = require("telegraf");

const {getAllCurrencies, getCurrency} = require("../requests");
const CURRENCIES = require("../currencies");
const db = require('../db')
const {subscribe} = require("./callbacks");

const bot = new Telegraf('5526237425:AAGvXllTL-KG1PG1yC8Yw92vQpkOqkyI2Zo');
const START_MENU = [['Show me all'], ['Show me chosen', 'Subscribed']];
const buttons = CURRENCIES.map(item => new Array(item)).concat([['back']])

//TODO: - переделать на action и закодить кнопки по триггеру
bot.hears('Show me chosen', ctx => ctx.reply('Choose the option', Markup.keyboard(buttons)))
bot.hears('back', ctx => ctx.reply('Went back', Markup.keyboard(START_MENU).resize()))
bot.hears('Show me all', async ctx => ctx.reply(`${await getAllCurrencies()}`))

bot.action('sub', async ctx => await subscribe(ctx));


bot.help((ctx) => ctx.reply('/get_crypto - returns rates of all available crypto currencies'))

//TODO: - вернуть стартовое меню
bot.command('start', async ctx => {
    ctx.reply('Hello', Markup.keyboard(START_MENU).resize())
    try {
        const name = ctx.update.message.from.first_name;
        const telegram_id = +ctx.update.message.from.id;
        await db.query(`INSERT INTO person (name, telegram_id) values ($1, $2) RETURNING *`, [name, telegram_id])
    } catch (error) {
        console.log(error)
    }
})

bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
bot.command('stop', ctx => ctx.reply('You\'ve stopped the bot').then(bot.stop()))

//TODO: - добавить шоб текст читался нормально (toUpperCase, например)
bot.on('text', async (ctx) => {
    try {
        const text = ctx.update.message.text;
        if (CURRENCIES.includes(text)) {
            const response = await getCurrency(text);
            return ctx.replyWithHTML(`${text} rate: ${response.toFixed(4)} usd`,
                Markup.inlineKeyboard(
                    [Markup.button.callback('Subscribe', 'sub')]
                ))
        }
        return ctx.reply('Doesn\'t exists');
    } catch (error) {
        console.log(error)
    }
})

module.exports = {bot};


