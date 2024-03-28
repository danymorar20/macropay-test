import express from 'express';

import booksRouter from './routes/books';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.status(200).type('text/plain').send('Hello, world!');
});

app.use('/api', booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
