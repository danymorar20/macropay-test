import booksData from '../storage/MOCK_DATA.json';

// Return all books
export const getEntries = () => booksData;

// Return a book by id
export const getBookById = (id: string) => {
    return booksData.find(book => book.id === id);
};