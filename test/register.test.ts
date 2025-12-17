import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { setRoutes } from '../src/routes/index';
import { database } from '../src/database';

describe('POST /api/register', () => {
    const app = express();
    app.use(express.json());
    setRoutes(app);

    beforeEach(() => {
        // Clear the database before each test
        database.clearUsers();
    });

    it('should register a new user successfully', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('User registered successfully');
        expect(response.body.user).to.have.property('id');
        expect(response.body.user.username).to.equal('testuser');
        expect(response.body.user.email).to.equal('test@example.com');
        expect(response.body.user).to.have.property('createdAt');
        expect(response.body.user).to.not.have.property('password');
    });

    it('should return 400 for missing username', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Missing required fields: username, email, and password are required.');
    });

    it('should return 400 for missing email', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Missing required fields: username, email, and password are required.');
    });

    it('should return 400 for missing password', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'test@example.com'
            });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Missing required fields: username, email, and password are required.');
    });

    it('should return 400 for invalid email format', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'invalid-email',
                password: 'password123'
            });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Invalid email format.');
    });

    it('should return 400 for username too short', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'ab',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Username must be at least 3 characters long.');
    });

    it('should return 400 for password too short', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: '12345'
            });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Password must be at least 6 characters long.');
    });

    it('should return 409 for duplicate email', async () => {
        // Register first user
        await request(app)
            .post('/api/register')
            .send({
                username: 'testuser1',
                email: 'test@example.com',
                password: 'password123'
            });

        // Try to register second user with same email
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser2',
                email: 'test@example.com',
                password: 'password456'
            });

        expect(response.status).to.equal(409);
        expect(response.body.error).to.equal('User with this email already exists.');
    });

    it('should return 409 for duplicate username', async () => {
        // Register first user
        await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'test1@example.com',
                password: 'password123'
            });

        // Try to register second user with same username
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                email: 'test2@example.com',
                password: 'password456'
            });

        expect(response.status).to.equal(409);
        expect(response.body.error).to.equal('User with this username already exists.');
    });
});
