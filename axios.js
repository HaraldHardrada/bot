const axios = require('axios')
//`https://rest.coinapi.io/v1/exchangerate`

module.exports = axios.create({
    baseURL: 'https://rest.coinapi.io/v1',
    headers: {'X-CoinAPI-Key': '13F314D3-41C2-4549-ACC1-82E039EF323D'}
})

