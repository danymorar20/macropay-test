import booksData from '../storage/MOCK_DATA.json';
import { v4 as uuidv4 } from 'uuid';
import { Book } from '../types';

let books: Book[] = [];

// Return all books
export const getEntries = () => booksData;

// Return a book by id
export const getBookById = (id: string) => {
    return booksData.find(book => book.id === id);
};

// Return books with a price more expensive than the param
export const getBooksByPrice = (price: number) => {
    return booksData.filter(book => book.price > price);
};

// create a new book and returns the new book
export const createBook = (bookData: any): Book => {
    if (
        typeof bookData.title !== 'string' || bookData.title.trim() === '' ||
        typeof bookData.author !== 'string' || bookData.author.trim() === '' ||
        typeof bookData.description !== 'string' || bookData.description.trim() === '' ||
        typeof bookData.price !== 'number' ||
        typeof bookData.availability !== 'number' ||
        typeof bookData.num_reviews !== 'number' ||
        typeof bookData.stars !== 'number'
    ) {
        throw new Error('Provided data is not valid.');
    }
    const newBook: Book = {
        id: uuidv4(),
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
