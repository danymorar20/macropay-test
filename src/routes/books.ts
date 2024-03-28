import express from 'express';
import * as booksServices from '../services/booksServices';

const router = express.Router();

// GET endpoint to retrieve a list of books from a JSON file 
router.get('/books', (_req, res) => {
    const books = booksServices.getEntries();
    res.status(200).json(books);
});

// GET endpoint to retrieve books by ID 
router.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const book = booksServices.getBookById(bookId);

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(400).json({ error: 'book not found' });
    }
});

export default router;
