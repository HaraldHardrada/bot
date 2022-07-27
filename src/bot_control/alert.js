const {startSchedule} = require('../helpers/cron')
const requests = require("../requests/requests");
const {filterRequest} = require('../helpers/arrays')
const CURRENCIES = require('../currencies')

let morningRates;
let eveningRates;

const getMorningRates = async () => {
    try {
        const req = async () => morningRates = await requests.getAllCurrencies()

        startSchedule('*/10 * * * * *', req)

        Object.keys(req).length === 0 && await req()

        return morningRates = filterRequest(morningRates, CURRENCIES)
    } catch (error) {
        console.log(error)
    }
}

const getEveningRates = async () => {
    try {
        const req = async () => eveningRates = await requests.getAllCurrencies();

        startSchedule('*/10 * * * * *', req)

        Object.keys(req).length === 0 && await req()

        return eveningRates = filterRequest(eveningRates, CURRENCIES)
    } catch (error) {
        console.log(error)
    }
}

const calcDeltaOverPct = (data1, data2, pct) => {

    const result = data1.map((item, ind) => {

        const cof = 100 - item.price_usd / data2[ind].price_usd * 100

        if (cof >= pct || cof <= -pct) {
            const res = {
                asset_id: item.asset_id,
                price_usd: item.price_usd,
                pct: cof.toFixed(2)
            }
            console.log(res)
        }

        return null;
    })
    console.log(result)
    return result
}




