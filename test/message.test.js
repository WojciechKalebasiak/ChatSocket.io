const expect = require('chai').expect;
const { generateMessage } = require('../server/utils/message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const text = 'test';
        const from = 'TestUser';
        const message = generateMessage(from, text);
        expect(message.text).to.equal(text);
        expect(message.from).to.equal(from);
        expect(message.createdAt).to.be.a('number');
    });
});