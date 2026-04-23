import { add } from "./math";

describe('add function', async () => {
    it('should return the sum of two numbers', () => {
        expect(add(3,2)).toBe(5)
    })
});
