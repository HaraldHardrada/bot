const axios = require('axios')
let {count} = require('./requests')
const API_KEYS = ['BF09A3E0-DD14-4D51-B199-AF54015CF579',
    '834C1385-CF84-4716-98BA-10A7301A552F',
    '13F314D3-41C2-4549-ACC1-82E039EF323D']
const apiKey = {
    currentIndex: 0,
    value: API_KEYS[this.currentIndex],
    next: function (){
       this.value = API_KEYS[this.currentIndex++]
    },
    restart: function (){
       this.currentIndex = 0;
    }
}
//функция, которая меняет ключ Api на другой в массиве, если функции с запросами на сервер были вызваны более 100 раз
function changeApiKey(maxRequests = 100) {
    if(count === maxRequests && apiKey.currentIndex <= API_KEYS.length) {
        apiKey.next()
        return count = 0
    }
    if(count === maxRequests && apiKey.currentIndex > API_KEYS.length) {
        apiKey.restart()
        return count = 0;
    }
}
//установка интервала проверки
setInterval(changeApiKey, 60000);

module.exports = axios.create({
    baseURL: 'https://rest.coinapi.io/v1',
    headers: {'X-CoinAPI-Key': apiKey.value},
})


