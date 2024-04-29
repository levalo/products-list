import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import dbConnect from './dbConnect'

dotenv.config()

const port = process.env.PORT || 3000
const dbUri = process.env.DB_URI

if (!dbUri) {
    console.error('Database uri not provided')
    process.exit()
}

const app = express()

app.use(bodyParser.json())

dbConnect(dbUri).then(() => {
    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}).catch((err) => {
    console.error(err)
    
    process.exit()
})