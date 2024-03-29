class NoBooksFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NoBooksFoundError';
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export { NoBooksFoundError, ValidationError };
