import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './dbConnect'
import productRoute from './routes/product.route'
import categoryRoute from './routes/category.route'

dotenv.config()

const port = process.env.PORT || 3000
const dbUri = process.env.DB_URI

if (!dbUri) {
    console.error('Database uri not provided')
    process.exit()
}

const app = express()

app.use(bodyParser.json())

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001'
}))

app.use(categoryRoute)
app.use(productRoute)

dbConnect(dbUri).then(() => {
    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}).catch((err) => {
    console.error(err)

    process.exit()
})