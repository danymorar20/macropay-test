import { Request, Response } from 'express';
import * as booksServices from '../services/booksServices';
import { NoBooksFoundError, ValidationError } from './../utils/errors';

export function handleBooksByPhrase(req: Request, res: Response) {
    const phrase = req.query.phrase?.toString() ?? "";;

    try {
        const booksContainingPhrase = booksServices.getBooksByAuthorPhrase(phrase);
        res.status(200).json(booksContainingPhrase);
    } catch (error: any) {
        handleValidationErrorOrNoBooksFoundError(res, error);
    }
}

export function handleBooksByPriceOrAll(req: Request, res: Response) {
    const priceParam = req.query.price as string;

    if (priceParam) {
        handleBooksByPrice(req, res, priceParam);
    } else {
        const books = booksServices.getEntries();
        res.status(200).json(books);
    }
}

function handleBooksByPrice(_req: Request, res: Response, priceParam: string) {
    if (!/^\d+$/.test(priceParam)) {
        return res.status(400).json({ error: 'Price should contain only numbers' });
    }

    const price = parseInt(priceParam, 10);
    const books = booksServices.getBooksByPrice(price);

    if (books.length === 0) {
        res.status(404).json({ error: 'No books found with the provided price' });
    } else {
        res.status(200).json(books);
    }
}

function handleValidationErrorOrNoBooksFoundError(res: Response, error: any) {
    if (error instanceof ValidationError) {
        res.status(400).json({ error: error.message });
    } else if (error instanceof NoBooksFoundError) {
        res.status(404).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export function getAverageBookCost(_req: Request, res: Response) {
    try {
        const average = booksServices.getAverageBookCost();
        res.status(200).json({ average });
    } catch (error: any) {
        res.status(404).json({ error: error.message });
    }
}