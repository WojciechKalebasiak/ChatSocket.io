const expect = require('chai').expect;
const { isRealString } = require('../server/utils/validation');

describe('isRealString', () => {
    it('to reject a non-string values', () => {
        const number = 214;

        const actual = isRealString(number);

        expect(actual).to.be.false;

    });
    it('to reject a string with spaces only', () => {
        const testString = '           ';

        const actual = isRealString(testString);

        expect(actual).to.be.false;

    });
    it('to allow a string with non-space charactecrs', () => {
        const testString = ' xasdq ';

        const actual = isRealString(testString);

        expect(actual).to.be.true;

    });
});