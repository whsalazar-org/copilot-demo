import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { setRoutes } from '../src/routes/index';

describe('GET /add', () => {
    const app = express();
    setRoutes(app);

    it('should return the sum of two numbers', async () => {
        const response = await request(app).get('/add?num1=5&num2=10');
        expect(response.status).to.equal(200);
        expect(response.body.result).to.equal(15);
    });

    it('should return 400 for missing parameters', async () => {
        const response = await request(app).get('/add?num1=5');
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Invalid input. Please provide two numbers.');
    });

    it('should return 400 for non-numeric parameters', async () => {
        const response = await request(app).get('/add?num1=five&num2=ten');
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Invalid input. Please provide two numbers.');
    });
});