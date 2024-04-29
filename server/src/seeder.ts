import dotenv from 'dotenv'
import { Faker, en } from '@faker-js/faker'
import dbConnect from './dbConnect'
import productModel from './models/product.model'
import categoryModel from './models/category.model'

dotenv.config()

const dbUri = process.env.DB_URI

if (!dbUri) {
    console.error('Database uri not provided')
    process.exit()
}

const customFaker = new Faker({
    locale: en
})

dbConnect(dbUri).then(async () => {
    
    const cats = await categoryModel.create({
        name: 'Cats'
    })

    for(let i = 0; i < 40; i++) {
        await productModel.create({
            name: customFaker.commerce.productName(),
            price: customFaker.commerce.price({ min: 1.99, max: 199.99 }),
            image: customFaker.image.urlLoremFlickr({ category: 'cats' }),
            category: cats
        })
    }

    const technics = await categoryModel.create({
        name: 'Technics'
    })

    for(let i = 0; i < 40; i++) {
        await productModel.create({
            name: customFaker.commerce.productName(),
            price: customFaker.commerce.price({ min: 1.99, max: 199.99 }),
            image: customFaker.image.urlLoremFlickr({ category: 'technics' }),
            category: technics
        })
    }

    const food = await categoryModel.create({
        name: 'Food'
    })

    for(let i = 0; i < 40; i++) {
        await productModel.create({
            name: customFaker.commerce.productName(),
            price: customFaker.commerce.price({ min: 1.99, max: 199.99 }),
            image: customFaker.image.urlLoremFlickr({ category: 'food' }),
            category: food
        })
    }

    const nightlife = await categoryModel.create({
        name: 'Nightlife'
    })

    for(let i = 0; i < 40; i++) {
        await productModel.create({
            name: customFaker.commerce.productName(),
            price: customFaker.commerce.price({ min: 1.99, max: 199.99 }),
            image: customFaker.image.urlLoremFlickr({ category: 'nightlife' }),
            category: nightlife
        })
    }

    console.log('Database seeded successfully')

    process.exit()

}).catch((err) => {
    console.error(err)
    
    process.exit()
})