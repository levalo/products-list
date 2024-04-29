import dotenv from 'dotenv'
import faker from '@faker-js/faker'
import dbConnect from './dbConnect'

dotenv.config()

const dbUri = process.env.DB_URI

if (!dbUri) {
    console.error('Database uri not provided')
    process.exit()
}

dbConnect(dbUri).then(() => {
    
    for(let i = 0; i < 200; i++) {
        // todo generate products
    }

}).catch((err) => {
    console.error(err)
    
    process.exit()
})