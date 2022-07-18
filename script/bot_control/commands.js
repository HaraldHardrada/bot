const {Telegraf} = require("telegraf");

const token = require('../../token')

const callbacks = require("./callbacks");

const bot = new Telegraf(token);

bot.hears('Show me chosen', callbacks.showChosen)
bot.hears('back', callbacks.goBack)

bot.action('showAll', callbacks.showAll)
bot.action('sub', callbacks.subscribe)

bot.help((ctx) => ctx.reply('/get_crypto - returns rates of all available crypto currencies'))

bot.command('start', callbacks.start)
bot.command('get_all_rates', callbacks.getAllRates)
bot.command('stop', callbacks.stop)

bot.on('text', callbacks.turnedOn)

module.exports = {bot};


