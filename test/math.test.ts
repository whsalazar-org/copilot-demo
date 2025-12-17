import { expect } from 'chai';
import { addNumbers } from '../src/math';

describe('addNumbers', () => {
    it('should return the sum of two positive numbers', () => {
        const result = addNumbers(5, 10);
        expect(result).to.equal(15);
    });

    it('should return the sum of a positive and a negative number', () => {
        const result = addNumbers(5, -3);
        expect(result).to.equal(2);
    });

    it('should return the sum of two negative numbers', () => {
        const result = addNumbers(-5, -10);
        expect(result).to.equal(-15);
    });

    it('should return the sum of a number and zero', () => {
        const result = addNumbers(5, 0);
        expect(result).to.equal(5);
    });

    it('should return the sum of two zeros', () => {
        const result = addNumbers(0, 0);
        expect(result).to.equal(0);
    });
});