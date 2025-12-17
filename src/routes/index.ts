import { Request, Response, Express } from 'express';
import { addNumbers } from '../math';

// Helper function to compute factorial iteratively to avoid recursion limits
function factorialHelper(n: number): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Public factorial method that validates input and delegates to the helper
export function factorial(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('Invalid input. Please provide a non-negative integer.');
    }
    return factorialHelper(n);
}

export function setRoutes(app: Express) {
    app.get('/add', (req: Request, res: Response) => {
        const num1Param = req.query.num1;
        const num2Param = req.query.num2;

        const num1 = typeof num1Param === 'string' ? parseFloat(num1Param) : NaN;
        const num2 = typeof num2Param === 'string' ? parseFloat(num2Param) : NaN;

        if (isNaN(num1) || isNaN(num2)) {
            return res.status(400).json({ error: 'Invalid input. Please provide two numbers.' });
        }

        const result = addNumbers(num1, num2);
        res.json({ result });
    });

    app.get('/factorial', (req: Request, res: Response) => {
        const nParam = req.query.n;
        const n = typeof nParam === 'string' ? Number(nParam) : NaN;

        if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) {
            return res.status(400).json({ error: 'Invalid input. Please provide a non-negative integer.' });
        }

        try {
            const result = factorial(n);
            res.json({ result });
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    });
}