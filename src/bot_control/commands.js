const {Markup} = require("telegraf");

const ArrayFilter = require('../helpers/arrays')
const CurrencyController = require("../controller/currency.controller");
const UserController = require("../controller/user.controller");
const UserSubscriptions = require('../controller/subscriptions.controller')
const {getCurrency, getAllCurrencies} = require("../requests");
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

const getAllRates = async ctx => ctx.reply(await getAllCurrencies());

const showChosen = ctx => {
    const menu = ArrayFilter.createButtons(CURRENCIES, 3, null, 'back')

    ctx.reply('Choose the option', Markup.keyboard(menu))
};

const goBack = ctx => ctx.reply('back', START_MENU);

//bot.on
//TODO: - добавить шоб текст читался нормально (toUpperCase, например)
const turnedOn = async ctx => {
    const text = ctx.update.message.text;
    if (CURRENCIES.includes(text)) {
        const response = await getCurrency(text);
        return ctx.replyWithHTML(`${text} rate: ${response.toFixed(4)} usd`,
            await UserSubscriptions.getButtonBySubStatus(ctx))
    }

    return ctx.reply('Doesn\'t exists');
}

module.exports = {start, stop, getAllRates, showChosen, goBack, turnedOn};
