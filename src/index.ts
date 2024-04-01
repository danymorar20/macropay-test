import express, { Request, Response } from "express";
import booksRouter from "./routes/books";
import authRouter from "./routes/auth";
import { cookieJwtAuth } from "./middleware/cookieJwtAuth";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
  res.status(200).type("text/plain").send("Hello, world!");
});

// login endpoint
app.use("/auth", authRouter);


// endpoints protected with jwt
app.use("/books", cookieJwtAuth, booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
