"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = void 0;
const MOCK_DATA_json_1 = __importDefault(require("../storage/MOCK_DATA.json"));
const getEntries = () => MOCK_DATA_json_1.default;
exports.getEntries = getEntries;
