const cron = require("node-cron");

const CurrencyController = require('../controller/currency.controller');
const CURRENCIES = require("../currencies");
const {getSubCurrencies} = require("../requests");

//subscription
const startSchedule = (cronFields, func, args) => {
    return cron.schedule(cronFields, async () => await func(args));
}

const subscribe = async ctx => {
    const symbol = CURRENCIES.map(item => ctx.update.callback_query.message.text.match(item)).join('')
    const userId = +ctx.update.callback_query.from.id

    try {
        //sends client's subscriptions list at 10:00 and 19:00 every day
        startSchedule('* 10,19 * * *', getSubCurrencies, ctx)

        if (await CurrencyController.checkSubscription({symbol, userId})) return ctx.reply('Already subscribed')

        //TODO: - сдлеать, чтоб после подписки кнопка менялась на "unsubscribe"
        ctx.reply('You will receive rate of this currency everyday at 10:00 AM and 07:00 PM')

        await CurrencyController.addCurrency({symbol, userId})

    } catch (error) {
        console.log(error);
    }
}


module.exports = {subscribe}