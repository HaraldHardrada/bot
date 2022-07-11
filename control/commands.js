const {Markup, Telegraf} = require("telegraf");

const {getAllCurrencies, getCurrency} = require("../requests");
const CURRENCIES = require("../currencies");

const bot = new Telegraf('5526237425:AAGvXllTL-KG1PG1yC8Yw92vQpkOqkyI2Zo');
const START_MENU = [['Show me all'], ['Show me chosen', 'Subscribed']];
const buttons = CURRENCIES.map(item => new Array(item)).concat([['back']])

bot.hears('Show me chosen', ctx => ctx.reply('Choose the option', Markup.keyboard(buttons)))
bot.hears('back', ctx => ctx.reply('Went back', Markup.keyboard(START_MENU).resize()))
bot.hears('Show me all',  async ctx => ctx.reply(`${await getAllCurrencies()}`))

bot.action('sub', async ctx => {
    ctx.reply('You will receive rate of this currency everyday at 10:00 AM and 07:00 PM');
    //код присылания и кнопка unsubscribe
})

bot.help((ctx) => ctx.reply('/get_crypto - returns rates of all available crypto currencies'))

bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
bot.command('stop', ctx => ctx.reply('You\'ve stopped the bot').then(bot.stop()))

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

module.exports = {bot, START_MENU}
