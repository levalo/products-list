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
    
    const categories = []
    
    categories.push(await categoryModel.create({
        name: 'Cotton'
    }))

    categories.push(await categoryModel.create({
        name: 'Polyester'
    }))

    categories.push(await categoryModel.create({
        name: 'Wool'
    }))

    categories.push(await categoryModel.create({
        name: 'Silk'
    }))

    categories.push(await categoryModel.create({
        name: 'Denim'
    }))

    categories.push(await categoryModel.create({
        name: 'Chiffon'
    }))

    categories.push(await categoryModel.create({
        name: 'Leather'
    }))

    for(let i = 0; i < 100; i++) {
        await productModel.create({
            name: customFaker.commerce.productName(),
            description: customFaker.commerce.productDescription(),
            price: Number(customFaker.commerce.price({ min: 1.99, max: 199 })),
            image: customFaker.image.urlLoremFlickr({ category: 'fashion' }),
            category: categories[Math.floor(Math.random() * categories.length)]
        })
    }

    console.log('Database seeded successfully')

    process.exit()

}).catch((err) => {
    console.error(err)
    
    process.exit()
})