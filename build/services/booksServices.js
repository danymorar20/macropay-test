"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByPrice = exports.getBookById = exports.getEntries = void 0;
const MOCK_DATA_json_1 = __importDefault(require("../storage/MOCK_DATA.json"));
// Return all books
const getEntries = () => MOCK_DATA_json_1.default;
exports.getEntries = getEntries;
// Return a book by id
const getBookById = (id) => {
    return MOCK_DATA_json_1.default.find(book => book.id === id);
};
exports.getBookById = getBookById;
// Return books with a price more expensive than the param
const getBooksByPrice = (price) => {
    return MOCK_DATA_json_1.default.filter(book => book.price > price);
};
exports.getBooksByPrice = getBooksByPrice;
