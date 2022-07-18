const {Markup, Telegraf} = require("telegraf");
const cron = require("node-cron");

const {bot} = require('../bot')
const CurrencyController = require("../controller/currency.controller");
const UserController = require("../controller/user.controller");
const {getSubCurrencies, getCurrency} = require("../requests");
const CURRENCIES = require("../currencies");


//subscription
const startSchedule = (cronFields, func, args) => {
    return cron.schedule(cronFields, async () => await func(args));
};

const subscribe = async ctx => {
    try {
        //sends client's subscriptions list at 10:00 and 19:00 every day
        startSchedule("0 10,19 * * *", getSubCurrencies, ctx);

        const isSubscribed = await CurrencyController.checkSubscription(ctx);

        if (isSubscribed) return ctx.reply("Already subscribed")

        //TODO: - сдлеать, чтоб после подписки кнопка менялась на "unsubscribe"
        //        - или чтобы при последующих запросах на одну и ту же валюту приходила кнопка 'unsubscribe'
        ctx.reply("You will receive rate of this currency everyday at 10:00 AM and 07:00 PM");

        await CurrencyController.addCurrency(ctx);
    } catch (error) {
        console.log(error);
    }
};

//commands
const START_MENU = [['Show me all'], ['Show me chosen', 'Subscribed']];

const start = async ctx => {
    ctx.reply("Hello", Markup.keyboard(START_MENU).resize());

    try {
        await UserController.createUser(ctx);
    } catch (error) {
        console.log(error);
    }
};

//Fixme: - сделать, чтоб бот нормально останавливался у юзера при нажатии команды stop
//       - можно сделать вручную кнопку restart, главное, чтоб бот нормально заканчивал какашку
const stop = async ctx => {
    ctx.reply('Your account was deleted and all subscriptions was cancelled')

    await CurrencyController.deleteUserCurrencies(ctx) //deletes user's subscriptions from database
    await UserController.deleteUser(ctx)   //deletes user from database

};

//bot.on
//TODO: - добавить шоб текст читался нормально (toUpperCase, например)
const turnedOn = async ctx => {
    const text = ctx.update.message.text;
    if (CURRENCIES.includes(text)) {
        const response = await getCurrency(text);
        return ctx.replyWithHTML(`${text} rate: ${response.toFixed(4)} usd`,
            Markup.inlineKeyboard(
                [Markup.button.callback('Subscribe', 'sub')]
            ))
    }
    return ctx.reply('Doesn\'t exists');

}


module.exports = {subscribe, start, stop, turnedOn};
