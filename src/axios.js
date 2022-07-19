const axios = require('axios')
const API_KEYS = ['BF09A3E0-DD14-4D51-B199-AF54015CF579',
    '834C1385-CF84-4716-98BA-10A7301A552F',
    '13F314D3-41C2-4549-ACC1-82E039EF323D',
    '2ECC1D4F-7DFE-4E26-B382-D742BEE8C5EE',
    '6524143E-7307-43A8-AA8A-D7363057BF28']

module.exports = axios.create({
    baseURL: 'https://rest.coinapi.io/v1',
    headers: {'X-CoinAPI-Key': API_KEYS[4]},
})


