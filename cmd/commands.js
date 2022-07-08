// const {Telegraf} = require('telegraf')
// const {getAllCurrencies, getCurrency} = require("../requests");
// const CURRENCIES = require("../currencies");
// const bot = new Telegraf(process.env.BOT_TOKEN)
//
// class Export
// {
//     getHelp(){
//         bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
//     }
//     getAll(){
//         bot.command('get_all_rates', async ctx => ctx.reply(`${await getAllCurrencies()}`))
//     }
//     getChosen(){
//         bot.command('stop', async ctx => ctx.reply('You\'ve stopped the bot').then(bot.stop()))
//     }
//     switchOn(){
//         bot.on('text', async (ctx) => {
//             try {
//                 const text = ctx.update.message.text;
//                 if (CURRENCIES.includes(text)) {
//                     const response = await getCurrency(text);
//                     return ctx.reply(`${text} rate: ${response.toFixed(4)} usd`)
//                 }
//                 return ctx.reply('Doesn\'t exists');
//             } catch (error) {
//                 console.log(error)
//             }
//         })
//     }
// }
//
// module.exports = new Export();
