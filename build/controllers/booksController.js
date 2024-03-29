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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageBookCost = exports.handleBooksByPriceOrAll = exports.handleBooksByPhrase = void 0;
const booksServices = __importStar(require("../services/booksServices"));
const errors_1 = require("./../utils/errors");
function handleBooksByPhrase(req, res) {
    var _a, _b;
    const phrase = (_b = (_a = req.query.phrase) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
    try {
        const booksContainingPhrase = booksServices.getBooksByAuthorPhrase(phrase);
        res.status(200).json(booksContainingPhrase);
    }
    catch (error) {
        handleValidationErrorOrNoBooksFoundError(res, error);
    }
}
exports.handleBooksByPhrase = handleBooksByPhrase;
function handleBooksByPriceOrAll(req, res) {
    const priceParam = req.query.price;
    if (priceParam) {
        handleBooksByPrice(req, res, priceParam);
    }
    else {
        const books = booksServices.getEntries();
        res.status(200).json(books);
    }
}
exports.handleBooksByPriceOrAll = handleBooksByPriceOrAll;
function handleBooksByPrice(_req, res, priceParam) {
    if (!/^\d+$/.test(priceParam)) {
        return res.status(400).json({ error: 'Price should contain only numbers' });
    }
    const price = parseInt(priceParam, 10);
    const books = booksServices.getBooksByPrice(price);
    if (books.length === 0) {
        res.status(404).json({ error: 'No books found with the provided price' });
    }
    else {
        res.status(200).json(books);
    }
}
function handleValidationErrorOrNoBooksFoundError(res, error) {
    if (error instanceof errors_1.ValidationError) {
        res.status(400).json({ error: error.message });
    }
    else if (error instanceof errors_1.NoBooksFoundError) {
        res.status(404).json({ error: error.message });
    }
    else {
        res.status(500).json({ error: 'Internal server error.' });
    }
}
function getAverageBookCost(_req, res) {
    try {
        const average = booksServices.getAverageBookCost();
        res.status(200).json({ average });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}
exports.getAverageBookCost = getAverageBookCost;
