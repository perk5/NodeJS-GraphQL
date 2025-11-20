const {userList, movieList} = require('./fakeData.js');


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
        }
    }
}

module.exports = resolvers