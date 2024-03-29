"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NoBooksFoundError = void 0;
class NoBooksFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoBooksFoundError';
    }
}
exports.NoBooksFoundError = NoBooksFoundError;
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
