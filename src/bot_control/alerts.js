const {startSchedule} = require('../helpers/cron')
const {getAllCurrencies} = require("../requests");

let dailyRates = [];
let eveningRates = [];

/**
 * функция принимает 2 массива (dailyRates и eveningRates) высчитывает коэффициенты разницы
 * между курсами валют и возвращает массив с валютами, курсы которых изменились на 5%+
 *
 * @param array1
 * @param array2
 *
 * @returns null или массив строк
 */
const calcDeltaOverPct = (array1, array2) => {
    const regex = /\d+\.\d+/;
    let compared = [];
    array2.map((item, i) => {
        const cof = parseFloat(item.match(regex)) / parseFloat(array1[i].match(regex))
        cof > 1.05 && compared.push((` ⬆️ ${((cof - 1) * 100).toFixed(2)}% `) + item)
        cof < 0.95 && compared.push((` ⬇️ ${((1 - cof) * 100).toFixed(2)}% `) + item)
    })
    return compared.length === 0 ? null : compared;
}

const updateDailyRates = () => {
    const func = async () => {
        return dailyRates = await getAllCurrencies();
    }

    dailyRates.length === 0 && func()

    return startSchedule('0 10 * * *', func)
}

const updateEveningRates = () => {
    const func = async () => {
        return eveningRates = await getAllCurrencies();
    }
    return startSchedule('0 20 * * *', func)
}

const morningAlert = (ctx) => {
    const func = () => {
        if (calcDeltaOverPct(eveningRates, dailyRates) === null) return;
        return ctx.reply(`This currencies has changed MORNING:\n
${calcDeltaOverPct(eveningRates, dailyRates).join('\n\n')}`)
    }
    return startSchedule('05 10 * * *', func)
}

const eveningAlert = (ctx) => {
    const func = () => {
        if (calcDeltaOverPct(dailyRates, eveningRates) === null) return;
        return ctx.reply(`This currencies has changed EVENING:\n 
${calcDeltaOverPct(dailyRates, eveningRates).join('\n\n')}`)
    }

    return startSchedule('05 20 * * *', func)
}

const startUpdRates = async () => {
    try {
        await updateDailyRates();
        await updateEveningRates();
    } catch (error) {
        console.log(error)
    }
}

module.exports = {startUpdRates, eveningAlert, morningAlert}