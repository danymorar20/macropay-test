"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksServices = __importStar(require("../services/booksServices"));
const router = express_1.default.Router();
// GET endpoint to retrieve a list of books from a JSON file 
// router.get('/books', (_req, res) => {
//     const books = booksServices.getEntries();
//     res.status(200).json(books);
// });
// // GET endpoint to retrieve books by ID 
// router.get('/books/:id', (req, res) => {
//     const bookId = req.params.id;
//     const book = booksServices.getBookById(bookId);
//     if (book) {
//         res.status(200).json(book);
//     } else {
//         res.status(400).json({ error: 'book not found' });
//     }
// });
// GET endpoint to get all the books that are more expensive than the param “price” provided
router.get('books/price', (req, res) => {
    const priceParam = req.query.price;
    console.log(priceParam);
    // check if parameter has only numbers
    if (!/^\d+$/.test(priceParam)) {
        return res.status(400).json({ error: 'Price should contain only numbers' });
    }
    const price = parseInt(priceParam, 10);
    const books = booksServices.getBooksByPrice(price);
    // if (books.length === 0) {
    //     return res.status(404).json({ error: 'No books found' });
    // } 
    res.status(200).json(books);
});
exports.default = router;
