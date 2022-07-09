/*
TODO: - отрефакторить код
      - вынести control, help, on в отдельный файл
      - экспортировать команды в bot.js
TODO: - разобраться с Heroku
TODO: - настроить кнопки
        -Subscribed
TODO: - добавить кнопку next
TODO: - добавить обработку введеного юзером текста
TODO: - дописать /help
TODO  - обернуть все команды и кнопки в try...catch
 */

const {Markup} = require('telegraf')
const bot = require('/control/commands.js')
const startMenu = require('/control/buttons.js');

bot.start(async (ctx) => {
    try {
        await ctx.reply('I want to get crypto rate', Markup.keyboard(startMenu).resize())
    } catch (error) {
        console.log(error)
    }
})

bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));