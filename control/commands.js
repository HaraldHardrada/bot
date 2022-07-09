const {getAllCurrencies, getCurrency} = require("../requests");
const CURRENCIES = require("../currencies");
const {Markup, Telegraf} = require("telegraf");
const bot = new Telegraf('5526237425:AAGvXllTL-KG1PG1yC8Yw92vQpkOqkyI2Zo');

bot.help((ctx) => ctx.reply('/get_crypto - returns rates of all available crypto currencies'))

bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
bot.command('stop', async ctx => ctx.reply('You\'ve stopped the bot').then(bot.stop()))

//добавить шоб текст читался нормально (toUpperCase, например)
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