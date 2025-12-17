import express from 'express';
import request from 'supertest';
import { expect } from 'chai';
import { setRoutes, factorial } from '../src/routes/index';

describe('factorial controller', () => {
  describe('factorial function (unit)', () => {
    it('computes factorial of 0 as 1', () => {
      expect(factorial(0)).to.equal(1);
    });

    it('computes factorial of 5 as 120', () => {
      expect(factorial(5)).to.equal(120);
    });

    it('throws for negative input', () => {
      expect(() => factorial(-1)).to.throw('Invalid input. Please provide a non-negative integer.');
    });

    it('throws for non-integer input', () => {
      expect(() => factorial(3.5)).to.throw('Invalid input. Please provide a non-negative integer.');
    });
  });

  describe('GET /factorial (integration)', () => {
    const app = express();
    setRoutes(app);

    it('returns 200 with factorial result for valid integer n', async () => {
      const res = await request(app).get('/factorial?n=6');
      expect(res.status).to.equal(200);
      expect(res.body.result).to.equal(720);
    });

    it('returns 400 for missing n', async () => {
      const res = await request(app).get('/factorial');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid input. Please provide a non-negative integer.');
    });

    it('returns 400 for non-integer n', async () => {
      const res = await request(app).get('/factorial?n=3.14');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid input. Please provide a non-negative integer.');
    });

    it('returns 400 for negative n', async () => {
      const res = await request(app).get('/factorial?n=-2');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid input. Please provide a non-negative integer.');
    });

    it('returns 400 for non-numeric n', async () => {
      const res = await request(app).get('/factorial?n=abc');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid input. Please provide a non-negative integer.');
    });
  });
});