import mongoose from 'mongoose'

async function dbConnect(uri: string) {
    try {
        await mongoose.connect(uri)

        console.log('Database connected successfully')
    }
    catch(err) {
        console.error('Database connection failed')

        throw err
    }
}

export default dbConnect