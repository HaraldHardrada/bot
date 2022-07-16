const Router = require('express')
const currencyController = require('../controller/currency.controller')

const router = new Router()

router.post('/currency', currencyController.addCurrency)
router.get('/currency', currencyController.getCurrenciesByUser)
router.delete('/currency/:id', currencyController.deleteUserCurrency)

module.exports = router;