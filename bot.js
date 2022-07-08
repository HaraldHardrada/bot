/*
TODO: - отрефакторить код
      - вынести cmd, help, on в отдельный файл
      - экспортировать команды в bot.js
TODO: - разобраться с Heroku
TODO: - настроить кнопки
        -Subscribed
TODO: - добавить кнопку next
TODO: - добавить обработку введеного юзером текста
TODO: - дописать /help
TODO  - обернуть все команды и кнопки в try...catch
FIXME - пофиксить ошибку, которая возникает при нажатии /start
      - TypeError: Markup.button is not a function
 */

const {getCurrency, getAllCurrencies} = require('./requests')
const CURRENCIES = require('./currencies')
const {Telegraf, Markup} = require('telegraf')
const bot = new Telegraf('5526237425:AAGvXllTL-KG1PG1yC8Yw92vQpkOqkyI2Zo')
const startMenu = [['Show me all'], ['Show me chosen', 'Subscribed']];

bot.help((ctx) => ctx.reply('/get_crypto - returns rates of all available crypto currencies'))

bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
bot.command('stop', async ctx => ctx.reply('You\'ve stopped the bot').then(bot.stop()))

bot.hears('Show me all', async ctx => ctx.reply(`${await getAllCurrencies()}`))

const buttons = CURRENCIES.map(item => new Array(item))
buttons.push(['BACK'])

bot.hears('Show me chosen', async ctx => await ctx.reply('Choose the option', Markup.keyboard(buttons)))


bot.hears('BACK', async ctx => ctx.reply('Went back', Markup.keyboard(startMenu).resize()))

bot.start(async (ctx) => {
    try {
        await ctx.reply('I want to get crypto rate', Markup.keyboard(startMenu).resize())
    } catch (error) {
        console.log(error)
    }
})

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

bot.action('sub', async ctx => {
     ctx.reply('You will receive rate of this currency everyday at 10:00 AM and 07:00 PM');
    //код присылания и кнопка unsubscribe
})


bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
