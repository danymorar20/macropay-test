import express from 'express';
import * as booksServices from '../services/booksServices';

const router = express.Router();

// GET endpoint to get all the books that are more expensive than the param “price” provided
// or get all books
router.get('/', (req, res) => {
    const priceParam = req.query.price as string;

    // if param exist return all books more expensive than the param
    if (priceParam) {
        if (!/^\d+$/.test(priceParam)) {
            return res.status(400).json({ error: 'Price should contain only numbers' });
        }

        const price = parseInt(priceParam, 10);
        const books = booksServices.getBooksByPrice(price);

        if (books.length === 0) return res.status(404).json({ error: 'No books found with the provided price' });

        res.status(200).json(books);
    } else {
        // return all books
        const books = booksServices.getEntries();
        res.status(200).json(books);
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

export default router;
