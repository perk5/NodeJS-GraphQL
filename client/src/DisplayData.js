import { useQuery, useLazyQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useState } from "react"

const QUERY_ALL_USERS = gql`
    query Users{
        users{
            id
            name
            age
            username 
            nationality
        }
    }
`

const QUERY_ALL_MOVIES = gql`
    query GetAllMovies{
        movies{
            id
            name
        }
    }
`

const QuerySpecificMovie = gql`
    query Movie($movie: String!){
        movie(name: $movie){
            name
        }
    }
`
const CreateNewUser = gql`
    mutation CreateUser($newUser: CreateUserInput!) {
        createUser(input: $newUser){
            name
            username
            age
            nationality
        }
    }
`


function DisplayData() {
    const [moviesInput, setMoviesInput] = useState("")
    const [name, setName] = useState("")
    const [username, setUserName] = useState("")
    let [age, setPersonAge] = useState("")
    const [nationality, setNationality] = useState("")
    const { data, loading, refetch } = useQuery(QUERY_ALL_USERS)
    const { data: movieData, loading: movieLoading } = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, { data: movieSearchData }] = useLazyQuery(QuerySpecificMovie)
    const [createUser, { data: userInformation }] = useMutation(CreateNewUser)

    if (loading || movieLoading) {
        return "Data is Loading...!"
    }

    if (data) {
        console.log(data)
    }

    if (userInformation) {
        console.log(userInformation)
    }

    return (<>
        <input type="text" placeholder="name" onChange={(event) => setName(event.target.value)} />
        <input type="text" placeholder="userName" onChange={(event) => setUserName(event.target.value)} />
        <input type="text" placeholder="age" onChange={(event) => setPersonAge(event.target.value)} />
        <input type="text" placeholder="nationality" onChange={(event) => setNationality(event.target.value)} />
        <button onClick={() => {
            createUser({
                variables: {
                    newUser: {
                        name, username,
                        age: Number(age), nationality
                    }
                }
            }); refetch()
        }}>Create User</button>

        {data && data.users.map((u) => {
            return <h4 key={u.id}>{u.name}</h4>
        })}
        {
            movieData.movies.map((m) => {
                return <h5 key={m.id}>{m.name}</h5>
            })
        }
        <div>
            <input type="text" placeholder="Interstellar" onChange={(event) => setMoviesInput(event.target.value)} />
            <button onClick={() => { fetchMovie({ variables: { movie: moviesInput } }); }}>Fetch Data</button>
        </div>
        <div>
            <h4>{movieSearchData && movieSearchData.movie.name}</h4>
        </div>
    </>
    )
}

export default DisplayData;