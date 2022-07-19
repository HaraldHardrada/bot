const {getSubCurrencies} = require("../requests");
const {startSchedule} = require('../helpers/cron');
const ArrayFilter = require("../helpers/arrays");

const CurrencyController = require("./currency.controller");
const {Markup} = require("telegraf");

class UserSubscriptions {
    async subscribe(ctx) {
        try {
            //sends client's subscriptions list at 10:00 and 19:00 every day "0 10,19 * * *"
            startSchedule("0 10,19 * * *", getSubCurrencies, ctx);

            // const isSubscribed = await CurrencyController.checkSubscription(ctx, 'callback');
            //
            // if (isSubscribed) return ctx.reply("Already subscribed")

            ctx.reply("You will receive rate of this currency everyday at 10:00 AM and 07:00 PM");

            await CurrencyController.addCurrency(ctx);
        } catch (error) {
            console.log(error);
        }
    }

    async getSubscriptions(ctx) {
        try {
            const userSubscriptions = await CurrencyController.getCurrenciesByUser(ctx, 'message');
            const menu = ArrayFilter.createButtons(userSubscriptions, 3, null, 'back')

            ctx.reply('Below', Markup.keyboard(menu).resize())
        } catch (error) {
            console.log(error)
        }
    }

    async getButtonBySubStatus(ctx) {
        let button = Markup.inlineKeyboard([Markup.button.callback('Unsubscribe', 'unSub')])
        const isSubscribed = await CurrencyController.checkSubscription(ctx, 'message')

        if (!isSubscribed) button = Markup.inlineKeyboard([Markup.button.callback('Subscribe', 'sub')])
        return button;
    }

    async unsubscribe(ctx) {
        await CurrencyController.deleteUserCurrency(ctx)
    }
}

module.exports = new UserSubscriptions();