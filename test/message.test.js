const expect = require('chai').expect;
const { generateMessage, generateLocationMessage } = require('../server/utils/message');
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
describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Wojciech';
        const latitude = 1;
        const longitude = 1;

        const data = generateLocationMessage(from, latitude, longitude);
        
        expect(data.from).to.equal(from);
        expect(data.url).to.equal('https://www.google.com/maps?q=1,1');
    });
});