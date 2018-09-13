const { UsersService } = require('../server/utils/users');
const { expect } = require('chai');
describe('UsersService', () => {
    let usersService;
    beforeEach(() => {
        usersService = new UsersService();
        usersService.users = [
            {
                id: '1',
                name: 'Tom',
                room: 'TestRoom'
            },
            {
                id: '2',
                name: 'Mike',
                room: 'TestRoom #2'
            },
            {
                id: '3',
                name: 'Jane',
                room: 'TestRoom #2'
            },
            {
                id: '4',
                name: 'Andrew',
                room: 'TestRoom'
            }
        ]
    });
    it('should add new user', () => {
        const user = {
            id: '123',
            name: 'TestUser',
            room: 'TestRoom'
        };

        usersService.addUser(user.id, user.name, user.room);
        const users = usersService.users;

        expect(users).to.deep.include(user);

    });
    it('should find a user', () => {
        const id = '1';
        const user = usersService.getUser(id);

        expect(user).to.eql(usersService.users[0]);
    });
    it('should not find a user', () => {
        const id = '99';
        
        const user = usersService.getUser(id);

        expect(user).to.be.undefined;

    });
    it('should not remove a user', () => {
        const id = '99';
        const user = usersService.removeUser(id);

        expect(user).to.be.undefined;
    });
    it('should remove a user', () => {
        const id = '1';
        const user = usersService.removeUser(id);

        expect(user.id).to.equal(id);
        expect(usersService.users.length).to.equal(3);

    });
    it('should return names for TestRoom room', () => {
        const usersList = usersService.getUserList('TestRoom');

        expect(usersList).to.have.members(['Tom', 'Andrew']);

    });
    it('should return names for TestRoom #2 room', () => {
        const usersList = usersService.getUserList('TestRoom #2');

        expect(usersList).to.have.members(['Jane', 'Mike']);

    });
});