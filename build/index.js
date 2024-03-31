"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_1 = __importDefault(require("./routes/books"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookieJwtAuth_1 = require("./middleware/cookieJwtAuth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/hello", (_req, res) => {
    res.status(200).type("text/plain").send("Hello, world!");
});
// login endpoint
app.use("/auth", auth_1.default);
// endpoints protected with jwt
app.use("/api/books", cookieJwtAuth_1.cookieJwtAuth, books_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
