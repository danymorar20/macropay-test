import booksData from '../storage/MOCK_DATA.json';

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