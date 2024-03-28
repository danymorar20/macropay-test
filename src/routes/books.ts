import express from 'express';
import * as booksServices from '../services/booksServices';

const router = express.Router();

// GET endpoint to retrieve a list of books from a JSON file 
router.get('/books', (_req, res) => {
    const books = booksServices.getEntries();
    res.status(200).json(books);
});

export default router;
