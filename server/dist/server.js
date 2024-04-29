"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = __importDefault(require("./dbConnect"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI;
if (!dbUri) {
    console.error('Database uri not provided');
    process.exit();
}
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001'
}));
app.use(category_route_1.default);
app.use(product_route_1.default);
(0, dbConnect_1.default)(dbUri).then(() => {
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
}).catch((err) => {
    console.error(err);
    process.exit();
});
