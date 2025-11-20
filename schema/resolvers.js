let {userList, movieList} = require('./fakeData.js');


const resolvers = {
    Query: {
        // User Resolvers
        users: () => {
            return userList
        },
        user: (_, args ) => {
            const id = args.id
            return userList.find(u => u.id === id)
        },

        // Movie Resolvers
        movies: () => {
            return movieList
        },

        movie: (_, args) => {
            const name = args.name
            return movieList.find(n => n.name === name)
        }
    },
    User:{
        favouriteMovies: () => {
            return movieList.filter(m => m.yearOfPublication > 2023 )
        }
    },
    Mutation:{
        createUser: (_, args) => {
            const user = args.input
            const lastId = userList[userList.length - 1].id
            user.id = parseInt(lastId) + 1
            userList.push(user)
            return user
        },
        updateUser: (_, args) => {
            const {id, name} = args.input
            const data = userList.find(x => x.id === id)
            data.name = name
            return data
        }, 
        deleteUser: (_, args) => {
            const {id} = args.input
            const removedUser = userList.find(u => u.id === id);
            userList = userList.filter(x => x.id !== id)
            return removedUser
        }
    }
}

module.exports = resolvers