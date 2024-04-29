import { Router } from 'express'
import categoryModel from '../models/category.model'

const categoryRoute = Router()

categoryRoute.get('/categories', async (req, res) => {
    const categories = await categoryModel.find().sort('name').select('name -_id').exec()

    return res.status(200).json({
        data: categories
    })
})

export default categoryRoute