const express = require('express');

const {bot} = require('./bot_control/control.js')
const userRouter = require('./routes/user.routes')
const currencyRouter = require('./routes/currency.routes')

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use('/bot', userRouter)
app.use('/bot', currencyRouter)


app.listen(PORT, () => console.log(`server has been started on port ${PORT}`))

// console.log(JSON.stringify(bot, '', 3))
// bot.start(ctx => ctx.reply('Hello'));
bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
