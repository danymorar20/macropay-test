import express from 'express';
import * as booksServices from '../services/booksServices';
import { NoBooksFoundError, ValidationError } from './../utils/errors';

const router = express.Router();

// GET endpoint to get all the books that are more expensive than the param “price” provided
// or get all books
router.get('/', (req, res) => {
    const phrase = req.query.phrase?.toString();

    if (phrase) {
        try {
            const booksContainingPhrase = booksServices.getBooksByAuthorPhrase(phrase);
            res.status(200).json(booksContainingPhrase);
        } catch (error: any) {
            if (error instanceof ValidationError) {
                res.status(400).json({ error: error.message });
            } else if (error instanceof NoBooksFoundError) {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error.' });
            }
        }
    } else {
        const priceParam = req.query.price as string;

        if (priceParam) {
            if (!/^\d+$/.test(priceParam)) {
                return res.status(400).json({ error: 'Price should contain only numbers' });
            }

            const price = parseInt(priceParam, 10);
            const books = booksServices.getBooksByPrice(price);

            if (books.length === 0) return res.status(404).json({ error: 'No books found with the provided price' });

            res.status(200).json(books);
        } else {
            const books = booksServices.getEntries();
            res.status(200).json(books);
        }
    }
});


// GET endpoint to retrieve books by ID 
router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const book = booksServices.getBookById(bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(400).json({ error: 'book not found' });
    }
});

// POST endpoint to create a new book
router.post('/', (req, res) => {
    try {
        const newBook = booksServices.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
