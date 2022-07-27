const {Markup} = require("telegraf");

const alerts = require('./alerts')

const responses = require('../requests/responses')
const arrayHelpers = require('../helpers/arrays')
const CurrencyController = require("../controller/currency.controller");
const UserController = require("../controller/user.controller");
const subscriptions = require('../helpers/subscriptions')
const CURRENCIES = require("../currencies");

const START_MENU = Markup.keyboard([['Show all', 'Choose'], ['Subscriptions']]).resize();

//commands
const start = async ctx => {
    ctx.reply("Hello", START_MENU);
    try {
        await UserController.createUser(ctx);
    } catch (error) {
        console.log(error);
    }
};

// Fixme: - сделать, чтоб бот нормально останавливался у юзера при нажатии команды stop
//       - можно сделать вручную кнопку restart, главное, чтоб бот нормально заканчивал какашку
const stop = async ctx => {
    ctx.reply('Your account was deleted and all subscriptions was cancelled')

    await CurrencyController.deleteUserCurrencies(ctx)
    await UserController.deleteUser(ctx)
};

const getAllRates = async ctx => ctx.reply(await responses.sendAllRates());

const showChosen = ctx => {
    const menu = arrayHelpers.createButtons(CURRENCIES, 3, null, 'back')

    ctx.reply('Choose the option', Markup.keyboard(menu))
};

const goBack = ctx => ctx.reply('back', START_MENU);

//bot.on
//TODO: - подумать, как сделать так, чтобы можно было парсить, например, bitcoin как BTC
const turnedOn = async ctx => {
    const text = ctx.update.message.text.toUpperCase();
    try {
        await alerts.startUpdRates();
        await alerts.morningAlert(ctx);
        await alerts.eveningAlert(ctx);

        if (CURRENCIES.includes(text)) {
            const res = await responses.sendOneRate(text);

            return ctx.replyWithHTML(`${text} rate: ${res.toFixed(4)} usd`,
                await subscriptions.getButtonBySubStatus(ctx))
        }

        return ctx.reply(`Bot can understand your message.
Please type like in example: 
BTC / btc
    `)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {start, stop, getAllRates, showChosen, goBack, turnedOn};


