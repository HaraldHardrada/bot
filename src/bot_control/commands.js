const {Telegraf} = require("telegraf");

const token = require('../../token')

const callbacks = require("./callbacks");

const bot = new Telegraf(token);

bot.hears('back', callbacks.goBack)
bot.hears('Choose', callbacks.showChosen)
bot.hears('Show all', callbacks.getAllRates)

bot.action('sub', callbacks.subscribe)

bot.command('start', callbacks.start)
bot.command('get_rates', callbacks.getAllRates)
bot.command('stop', callbacks.stop)

bot.telegram.setMyCommands([
    {command: "start", description: "Launches bot and adds user to database"},
    {command: "get_rates", description: "Returns rates of all available currencies"},
    {command: "stop", description: "Bot stops and deletes user and user\'s subscriptions from database"},
])

bot.on('text', callbacks.turnedOn)

module.exports = {bot};


