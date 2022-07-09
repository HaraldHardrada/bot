const CURRENCIES = require("../currencies");
const {Markup} = require("telegraf");
const {getAllCurrencies} = require("../requests");
const bot = require("commands")
const startMenu = [['Show me all'], ['Show me chosen', 'Subscribed']];

const buttons = CURRENCIES.map(item => new Array(item))
buttons.push(['back'])


bot.hears('Show me chosen', async ctx => await ctx.reply('Choose the option', Markup.keyboard(buttons)))
bot.hears('BACK', async ctx => ctx.reply('Went back', Markup.keyboard(startMenu).resize()))
bot.hears('Show me all', async ctx => ctx.reply(`${await getAllCurrencies()}`))
bot.action('sub', async ctx => {
    ctx.reply('You will receive rate of this currency everyday at 10:00 AM and 07:00 PM');
    //код присылания и кнопка unsubscribe
})

module.exports = startMenu;


