const {userList} = require('./fakeData.js');

const resolvers = {
    Query: {
        users(){
            return userList
        }
    }
}

module.exports = {resolvers}