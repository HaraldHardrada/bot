const axios = require('../axios')
const {startSchedule} = require('../helpers/cron')
const subscriptions = require('../helpers/subscriptions')
const ArrayFilter = require("../helpers/arrays");
const CURRENCIES = require("../currencies");
c

let dailyRates = [];

const compare = (res, req) => {
    const regex = /\d+\.\d+/;
    let changed = [];
    req.map((item, i, a) => {
        const cof = parseFloat(item.match(regex)) / parseFloat(res[i].match(regex))
        cof > 1.05 && changed.push(item + (`(⬆️ ${((cof - 1) * 100).toFixed(2)}%)`))
        cof < 0.95 && changed.push(item + (`(⬇️ ${((1 - cof) * 100).toFixed(2)}%)`))
    })
    return changed
}

const updateDaily = () => {
    startSchedule('')

}
