"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
//contains business logic and interacts with data sources or external APIs.
const db_1 = __importDefault(require("../config/db"));
async function getAllProducts() {
    const result = await db_1.default.query(' SELECT products.*, brands.name AS brand_name FROM products JOIN brands ON products.brand_id = brands.id');
    return result.rows;
}
async function getProductById(id) {
    const result = await db_1.default.query('SELECT products.*, brands.name AS brand_name, categories.name AS category_name FROM products JOIN brands ON products.brand_id = brands.id  JOIN categories ON products.category_id = categories.id WHERE products.id = $1', [id]);
    return result.rows[0] || null;
}
