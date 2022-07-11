const axios = require('axios')
const API_KEYS = ['BF09A3E0-DD14-4D51-B199-AF54015CF579',
    '834C1385-CF84-4716-98BA-10A7301A552F',
    '13F314D3-41C2-4549-ACC1-82E039EF323D']


let currentIndex = 0;
const apiKey = {
    value: API_KEYS[currentIndex],
    next: function (){
        this.value = API_KEYS[currentIndex + 1]
        currentIndex += 1;
    },
    restart: function (){
      currentIndex = 0;
    }
}

//функция, которая меняет ключ Api
console.log(`old API key: ${apiKey.value}`)
function changeApiKey() {
    currentIndex <= API_KEYS.length ? apiKey.next() : apiKey.restart()
    console.log(`new API key: ${apiKey.value}`)
    console.log(`new Index: ${currentIndex}`)
}

const Axios = axios.create({
    baseURL: 'https://rest.coinapi.io/v1',
    headers: {'X-CoinAPI-Key': apiKey.value},
})

module.exports = {Axios, changeApiKey}

