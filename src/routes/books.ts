import express from "express";
import * as booksServices from "../services/booksServices";
import { Request, Response } from "express";
import * as booksController from "../controllers/booksController";

const router = express.Router();

//GET endpoint to get the average cost of each book
router.get("/average", booksController.getAverageBookCost);

// GET endpoint to get all the books that are more expensive than the param “price” provided
// or get all books by phase or all books
router.get("/", (req: Request, res: Response) => {
  const phrase = req.query.phrase?.toString();

  if (phrase) {
    booksController.handleBooksByPhrase(req, res);
  } else {
    booksController.handleBooksByPriceOrAll(req, res);
  }
});

// GET endpoint to retrieve books by ID
router.get("/:id", (req, res) => {
  const bookId = req.params.id;
  const book = booksServices.getBookById(bookId);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(400).json({ error: "book not found" });
  }
});

// POST endpoint to create a new book
router.post("/", (req, res) => {
  try {
    const newBook = booksServices.createBook(req.body);
    res.status(201).json(newBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
