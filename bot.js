/*
TODO: - отрефакторить код
      - вынести commands, help, on в отдельный файл
      - экспортировать команды в bot.js
TODO: - разобраться с Heroku
TODO: - настроить кнопки
TODO: - добавить кнопку back
TODO: - добавить кнопку next
TODO: - добавить обработку введеного юзером кода
 */
const {Telegraf, Markup} = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async (ctx) => {
    try {
        await ctx.reply('I want to get crypto rate', Markup.keyboard([['Show me all'], ['Show me chosen', 'Subscribed']]).resize())
    } catch (error) {
        console.log(error)
    }
})

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
