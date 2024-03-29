"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooksByAuthorPhrase = exports.createBook = exports.getBooksByPrice = exports.getBookById = exports.getEntries = void 0;
const MOCK_DATA_json_1 = __importDefault(require("../storage/MOCK_DATA.json"));
const uuid_1 = require("uuid");
const errors_1 = require("./../utils/errors");
let books = [];
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
// create a new book and returns the new book
const createBook = (bookData) => {
    if (typeof bookData.title !== 'string' || bookData.title.trim() === '' ||
        typeof bookData.author !== 'string' || bookData.author.trim() === '' ||
        typeof bookData.description !== 'string' || bookData.description.trim() === '' ||
        typeof bookData.price !== 'number' ||
        typeof bookData.availability !== 'number' ||
        typeof bookData.num_reviews !== 'number' ||
        typeof bookData.stars !== 'number') {
        throw new Error('Provided data is not valid.');
    }
    const newBook = {
        id: (0, uuid_1.v4)(),
        title: bookData.title.trim(),
        author: bookData.author.trim(),
        description: bookData.description.trim(),
        price: bookData.price,
        availability: bookData.availability,
        num_reviews: bookData.num_reviews,
        stars: bookData.stars,
    };
    return newBook;
};
exports.createBook = createBook;
function getBooksByAuthorPhrase(phrase) {
    if (!/^[a-zA-Z]+$/.test(phrase)) {
        throw new errors_1.ValidationError('Phrase should contain only alphabet letters');
    }
    const booksContainingPhrase = MOCK_DATA_json_1.default.filter(book => {
        const authorName = book.author.toLowerCase();
        const phraseLetters = phrase.toLowerCase().split('');
        return phraseLetters.every(letter => authorName.includes(letter));
    });
    if (booksContainingPhrase.length === 0) {
        throw new errors_1.NoBooksFoundError('No books found with the provided author phrase');
    }
    return booksContainingPhrase;
}
exports.getBooksByAuthorPhrase = getBooksByAuthorPhrase;
