const {Markup} = require("telegraf");

const responses = require('../requests/responses')
const {startSchedule} = require('./cron');
const ArrayFilter = require("./arrays");

const CurrencyController = require("../controller/currency.controller");


const subscribe = async (ctx) => {
    try {
        //sends client's subscriptions list at 10:00 and 19:00 every day "0 10,19 * * *"
        startSchedule("0 10,19 * * *", responses.sendSubRates, ctx);

        const isSubscribed = await CurrencyController.checkSubscription(ctx);

        if (isSubscribed) return ctx.reply("Already subscribed")

        ctx.reply("You will receive rate of this currency everyday at 10:00 AM and 07:00 PM");

            await CurrencyController.addCurrency(ctx);
        } catch (error) {
            console.log(error);
        }
    }

    //TODO: - переделать на inline_keyboard
const getSubscriptions = async (ctx) => {
    try {
        const userSubscriptions = await CurrencyController.getCurrenciesByUser(ctx);
        const menu = ArrayFilter.createButtons(userSubscriptions, 3, null, 'back')

        ctx.reply('Below', Markup.keyboard(menu).resize())
    } catch (error) {
        console.log(error)
    }
}

const getButtonBySubStatus = async (ctx) => {
    let button = Markup.inlineKeyboard([Markup.button.callback('Unsubscribe', 'unSub')])
    const isSubscribed = await CurrencyController.checkSubscription(ctx)

    if (!isSubscribed) button = Markup.inlineKeyboard([Markup.button.callback('Subscribe', 'sub')])
    return button;
}

const unsubscribe = async (ctx) => {
    await CurrencyController.deleteUserCurrency(ctx)
}


module.exports = {subscribe, getSubscriptions, getButtonBySubStatus, unsubscribe}