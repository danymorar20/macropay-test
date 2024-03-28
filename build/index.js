"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get('/hello', (_req, res) => {
    res.status(200).type('text/plain').send('Hello, world!');
});
app.use('/api/books', books_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
