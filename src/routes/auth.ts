import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// set the environment config
dotenv.config();

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const { user, password } = req.body as { user: string, password: string };

    // Only for this example, check if user and password are same than the requirement
    if (user !== 'user4' && password !== 'pass4#') {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Using the secret key from environment config
    const token = jwt.sign({ userId: user }, process.env.MY_SECRET as string, { expiresIn: "1hr" });

    // set token in a cookie
    res.cookie("token", token, {
        httpOnly: true,
    });

    res.json({ token });
});

export default router;
