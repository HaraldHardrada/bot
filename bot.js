const {Markup, Telegraf} = require('telegraf')

const {bot, START_MENU} = require('./control/commands.js')

// console.log(`bot: ${JSON.stringify(bot, '' , 3)}`)
bot.start(ctx => ctx.reply('I want to get crypto rate', Markup.keyboard(START_MENU).resize()))

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
