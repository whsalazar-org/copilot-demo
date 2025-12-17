import { Request, Response, Express } from 'express';
import { addNumbers } from '../math';
import { database } from '../database';
import { RegisterRequest, User } from '../types/user';

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

    app.post('/api/register', (req: Request, res: Response) => {
        const { username, email, password }: RegisterRequest = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields: username, email, and password are required.' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }

        // Validate username length
        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long.' });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }

        // Check if user already exists
        if (database.findUserByEmail(email)) {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }

        if (database.findUserByUsername(username)) {
            return res.status(409).json({ error: 'User with this username already exists.' });
        }

        // Create new user
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            username,
            email,
            password,
            createdAt: new Date()
        };

        database.addUser(newUser);

        // Return success response without password
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });
    });
}