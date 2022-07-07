//разобраться с Heroku
//добавить кнопочки

const {getCurrency, getAllCurrencies} = require('./requests')
const CURRENCIES = require('./currencies')
const {Telegraf} = require('telegraf')
const bot = new Telegraf('5526237425:AAGvXllTL-KG1PG1yC8Yw92vQpkOqkyI2Zo')

//добавляю команды боту, вынести commands, help, on
bot.command('get_crypto', async (ctx) => {

    ctx.reply('Command is temporally not available')
    // const response = await getCurrency();
    // ctx.reply(`BTC rate: ${response.toFixed(4)}`)
})
bot.command('get_all_crypto', async (ctx) => {
    //пробежаться по результату и вернуть кал, который присутствует в массиве CURRENCIES
    const response = await getAllCurrencies();
    ctx.reply(`${response}`)
})

bot.command('stop', async (ctx) => {

    ctx.reply('You\'ve stopped the bot').then(bot.stop())
})

bot.start((ctx) => ctx.reply(`${ctx.message.from.first_name}, crypto?`))

//записываю команды и их описание в команду /help
bot.help((ctx) => ctx.reply(
    '/get_crypto - returns rates of all available crypto currencies'
))

//добавить шоб текст читался нормально (toUpperCase, например)
bot.on('text', async (ctx) => {
    const text = ctx.update.message.text;
    if (CURRENCIES.includes(text)) {
        const response = await getCurrency(text);
        return ctx.reply(`${text} rate: ${response.toFixed(4)} usd`)
    }
    return ctx.reply('Пошел нахуй');
})

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
