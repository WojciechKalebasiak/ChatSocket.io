class UsersService {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {
            id,
            name,
            room
        };
        this.users.push(user);
        return user;
    }
    getUser(id) {
        const user = this.users.find(user => user.id === id);
        return user;
    }
    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }
        return user;
    }
    getUserList(room) {
        const users = this.users.filter(user => user.room === room);
        const names = users.map(user => user.name);
        return names;
    }
}
module.exports = { UsersService };