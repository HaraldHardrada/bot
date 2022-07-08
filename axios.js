//дописать некий механизм свитча, который будет заменять baseURL, когда будет достигнут лимит запросов
//на текущий день

const axios = require('axios')

module.exports = axios.create({
    baseURL: 'https://rest.coinapi.io/v1',
    headers: {'X-CoinAPI-Key': '834C1385-CF84-4716-98BA-10A7301A552F'}
})

