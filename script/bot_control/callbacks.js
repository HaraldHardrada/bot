const cron = require('node-cron');

const {getSubCurrencies} = require('../requests')

const sendSub = cron.schedule("*/5 * * * * *", async () =>{
    await getSubCurrencies();
}, {
    scheduled: false
})

module.exports = {sendSub};

