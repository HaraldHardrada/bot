const getCurrency = require('./request')
const CURRENCIES = require('./currencies')
const {Telegraf} = require('telegraf')
const bot = new Telegraf('5526237425:AAGvXllTL-KG1PG1yC8Yw92vQpkOqkyI2Zo')

//добавляю команды боту
bot.command('get_crypto', async (ctx) => {
    const response = await getCurrency();
    ctx.reply(`BTC rate: ${response.toFixed(4)}`)
})

bot.start((ctx) => ctx.reply(`${ctx.message.from.first_name}, crypto?`))

//записываю команды и их описание в команду /help
bot.help((ctx) => ctx.reply(
    '/get_crypto - returns rates of all coinbase crypto currencies'
))

//добавить шоб текст читался нормально (toUpperCase, например)
bot.on('text', async (ctx) => {
    const text = ctx.update.message.text;
    if(CURRENCIES.includes(text)){
        const response = await getCurrency(text);
      return ctx.reply(`${text} rate: ${response.toFixed(4)}`)
    }
    return ctx.reply('Пошел нахуй');
})

bot.launch()
