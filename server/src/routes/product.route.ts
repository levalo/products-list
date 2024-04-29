import { Router } from 'express'
import productModel from '../models/product.model'
import { PipelineStage } from 'mongoose'
import xss from 'xss'

const productRoute = Router()

productRoute.get('/products', async (req, res) => {
    const perPage = typeof req.query.perPage === 'string' ? Math.max(1, parseInt(req.query.perPage) || 0) : 10
    const page = typeof req.query.page === 'string' ? Math.max(1, parseInt(req.query.page) || 0) : 1
    const term = typeof req.query.term === 'string' ? xss(req.query.term.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')) : null
    const category = typeof req.query.category === 'string' ? xss(req.query.category.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')) : null
    const sort = typeof req.query.sort === 'string' ? xss(req.query.sort.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')) : 'price'
    const sortOrd = typeof req.query.sortOrd === 'string' ? req.query.sortOrd : 'asc'

    const query: PipelineStage[] = [
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: "_id",
                as: 'category'
            }
        },
        {
            $unwind: '$category'
        },
        {
            $project: {
                '_id': 0,
                '__v': 0,
                'category._id': 0,
                'category.__v': 0
            }
        },
        {
            $addFields: {
                price: {
                    $toDouble: '$price'
                }
            }
        }
    ]

    if (term) {

        query.push({
            $match: {
                name: { $regex: term, $options: 'i' }
            },
        })
    }

    if (category) {
        query.push({
            $match: {
                'category.name': category
            }
        })
    }
    
    const total = (await productModel.aggregate(query).exec()).length

    const products = await productModel.aggregate(query)
        .sort({ [sort]: sortOrd === 'asc' ? 1 : -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .exec()

    return res.status(200).json({
        data: {
            items: products,
            total
        }
    })
})

export default productRoute