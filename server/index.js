const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const URL = 'mongodb://localhost:27017/OnlineShop'
const port = 3030

const router = require('./routes')

mongoose.connect(URL)
    .then(() => {
        console.log(`App connected to DB!`);
    })
    .catch((err) => {
        console.error(`DB Error: ${err}`);
    })

const app = express()

app.use(cookieParser())
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true, limit: '100mb' }))
app.use(cors())
app.use(router)

app.listen(port, () => console.log(`App is listening on port ${port}...`))