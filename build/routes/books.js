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
const booksController = __importStar(require("../controllers/booksController"));
const router = express_1.default.Router();
//GET endpoint to get the average cost of each book
router.get("/average", booksController.getAverageBookCost);
// GET endpoint to get all the books that are more expensive than the param “price” provided
// or get all books by phase or all books
router.get("/", (req, res) => {
    var _a;
    const phrase = (_a = req.query.phrase) === null || _a === void 0 ? void 0 : _a.toString();
    if (phrase) {
        booksController.handleBooksByPhrase(req, res);
    }
    else {
        booksController.handleBooksByPriceOrAll(req, res);
    }
});
// GET endpoint to retrieve books by ID
router.get("/:id", (req, res) => {
    const bookId = req.params.id;
    const book = booksServices.getBookById(bookId);
    if (book) {
        res.status(200).json(book);
    }
    else {
        res.status(400).json({ error: "book not found" });
    }
});
// POST endpoint to create a new book
router.post("/", (req, res) => {
    try {
        const newBook = booksServices.createBook(req.body);
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.default = router;
