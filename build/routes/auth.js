"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// set the environment config
dotenv_1.default.config();
const router = express_1.default.Router();
router.post('/', (req, res) => {
    const { user, password } = req.body;
    // Only for this example, check if user and password are same than the requirement
    if (user !== 'user4' && password !== 'pass4#') {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Using the secret key from environment config
    const token = jsonwebtoken_1.default.sign({ userId: user }, process.env.MY_SECRET, { expiresIn: "1hr" });
    // set token in a cookie
    res.cookie("token", token, {
        httpOnly: true,
    });
    res.json({ token });
});
exports.default = router;
