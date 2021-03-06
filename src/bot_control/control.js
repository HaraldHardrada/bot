//TODO: - добавить роли админ и юзер
const {Telegraf} = require("telegraf");

const token = require('../../token');

const userSubscriptions = require('../controller/subscriptions.controller')

const callbacks = require("./commands");

const bot = new Telegraf(token);

bot.hears('back', callbacks.goBack)
bot.hears('Choose', callbacks.showChosen)
bot.hears('Show all', callbacks.getAllRates)
bot.hears('Subscriptions', userSubscriptions.getSubscriptions)

bot.action('sub', userSubscriptions.subscribe)
bot.action('unSub', userSubscriptions.unsubscribe)

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


