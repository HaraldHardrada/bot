const express = require('express');

const {bot} = require('./bot_control/control.js')
const userRouter = require('./routes/user.routes')
const currencyRouter = require('./routes/currency.routes')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', currencyRouter)

app.listen(PORT, () => console.log("server started"))

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
