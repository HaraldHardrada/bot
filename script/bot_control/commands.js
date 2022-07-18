const {Markup, Telegraf} = require("telegraf");

const token = require('../../token')

const {getAllCurrencies, getCurrency} = require("../requests");
const callbacks = require("./callbacks");
const CURRENCIES = require("../currencies");

const bot = new Telegraf(token);
const buttons = CURRENCIES.map(item => new Array(item)).concat([['back']])
const START_MENU = [['Show me all'], ['Show me chosen', 'Subscribed']];

//TODO: - переделать на action и закодить кнопки по триггеру
bot.hears('Show me chosen', ctx => ctx.reply('Choose the option', Markup.keyboard(buttons)))
bot.hears('back', ctx => ctx.reply('Went back', Markup.keyboard(START_MENU).resize()))
bot.hears('Show me all', async ctx => ctx.reply(`${await getAllCurrencies()}`))

bot.action('sub', callbacks.subscribe);

bot.help((ctx) => ctx.reply('/get_crypto - returns rates of all available crypto currencies'))

bot.command('start', callbacks.start)
bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
bot.command('stop', callbacks.stop)

bot.on('text', callbacks.turnedOn)

module.exports = {bot, START_MENU};


