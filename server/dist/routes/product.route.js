"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_model_1 = __importDefault(require("../models/product.model"));
const productRoute = (0, express_1.Router)();
productRoute.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const perPage = typeof req.query.perPage === 'string' ? Math.max(1, parseInt(req.query.perPage)) : 10;
    const page = typeof req.query.page === 'string' ? Math.max(1, parseInt(req.query.page)) : 1;
    const term = typeof req.query.term === 'string' ? req.query.term : null;
    const category = typeof req.query.category === 'string' ? req.query.category : null;
    const sort = typeof req.query.sort === 'string' ? req.query.sort : 'price';
    const sortOrd = typeof req.query.sortOrd === 'string' ? req.query.sortOrd : 'asc';
    const query = [
        {
            $lookup: {
                from: 'categories',
                localField: "category",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $project: {
                '_id': 0,
                '__v': 0,
                'category._id': 0,
                'category.__v': 0
            }
        }
    ];
    if (term) {
        query.push({
            $match: {
                $or: [
                    {
                        name: { $regex: term, $options: 'i' }
                    },
                    {
                        description: { $regex: term, $options: 'i' }
                    }
                ]
            }
        });
    }
    if (category) {
        query.push({
            $match: {
                'category.name': category
            }
        });
    }
    const total = (yield product_model_1.default.aggregate(query).exec()).length;
    const products = yield product_model_1.default.aggregate(query)
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ [sort]: sortOrd === 'asc' ? 1 : -1 })
        .exec();
    return res.status(200).json({
        data: {
            items: products,
            total
        }
    });
}));
exports.default = productRoute;
