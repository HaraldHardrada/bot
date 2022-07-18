const Router = require('express')
const currencyController = require('../controller/currency.controller')

const router = new Router()

router.post('/currency', currencyController.addCurrency)
router.get('/currency', currencyController.getCurrenciesByUser)
router.get('/currency', currencyController.checkSubscription)
router.delete('/currency/:id', currencyController.deleteUserCurrencies)

module.exports = router;