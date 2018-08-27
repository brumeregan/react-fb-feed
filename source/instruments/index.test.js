import { sum, delay, getUniqueID, getFullApiUrl } from './';


describe('instruments', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw an error if operand2 is not a number', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should throw an error if operand 1 is not a number', () => {
        expect(() => sum('string', 2)).toThrow();
    });

    test('sum function should return an addition of two arguments', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBe('A resolved promise');
    });

    test('getUniqueID should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID should throw, when called with non-number param', () => {
        expect(() => getUniqueID('string')).toThrow();
    });

    test('getUniqueID should produce a string of a desired length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(11)).toHaveLength(11);
    });

    test('getFullApiUrl is a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function is thrown an error if param 1 is not a string', () => {
        expect(() => getFullApiUrl(null, 'string')).toThrow();
    });

    test('getFullApiUrl function is thrown an error if param 2 is not a string', () => {
        expect(() => getFullApiUrl('string', 42)).toThrow();
    });

    test('getFullApiUrl should return a string', () => {
        expect(typeof getFullApiUrl('string', 'string')).toBe('string');
    });

    test('getFullApiUrl should match snapshot', () => {
        expect(getFullApiUrl('api', 'group_id')).toMatchSnapshot();
    });
});
