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
const dotenv_1 = __importDefault(require("dotenv"));
const faker_1 = require("@faker-js/faker");
const dbConnect_1 = __importDefault(require("./dbConnect"));
const product_model_1 = __importDefault(require("./models/product.model"));
const category_model_1 = __importDefault(require("./models/category.model"));
dotenv_1.default.config();
const dbUri = process.env.DB_URI;
if (!dbUri) {
    console.error('Database uri not provided');
    process.exit();
}
const customFaker = new faker_1.Faker({
    locale: faker_1.en
});
(0, dbConnect_1.default)(dbUri).then(() => __awaiter(void 0, void 0, void 0, function* () {
    const categories = [];
    categories.push(yield category_model_1.default.create({
        name: 'Cotton'
    }));
    categories.push(yield category_model_1.default.create({
        name: 'Polyester'
    }));
    categories.push(yield category_model_1.default.create({
        name: 'Wool'
    }));
    categories.push(yield category_model_1.default.create({
        name: 'Silk'
    }));
    categories.push(yield category_model_1.default.create({
        name: 'Denim'
    }));
    categories.push(yield category_model_1.default.create({
        name: 'Chiffon'
    }));
    categories.push(yield category_model_1.default.create({
        name: 'Leather'
    }));
    for (let i = 0; i < 100; i++) {
        yield product_model_1.default.create({
            name: customFaker.commerce.productName(),
            description: customFaker.commerce.productDescription(),
            price: Number(customFaker.commerce.price({ min: 1.99, max: 199 })),
            image: customFaker.image.urlLoremFlickr({ category: 'fashion' }),
            category: categories[Math.floor(Math.random() * categories.length)]
        });
    }
    console.log('Database seeded successfully');
    process.exit();
})).catch((err) => {
    console.error(err);
    process.exit();
});
