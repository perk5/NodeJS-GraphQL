import { useQuery, useLazyQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import {useState} from "react"

const QUERY_ALL_USERS = gql`
    query GetAllUsers{
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


function DisplayData() {
    const [moviesInput, setMoviesInput] = useState("")
    const { data, loading } = useQuery(QUERY_ALL_USERS)
    const { data: movieData, loading: movieLoading  } = useQuery(QUERY_ALL_MOVIES)
    const [fetchMovie, {data: movieSearchData, error: movieError}] = useLazyQuery(QuerySpecificMovie)
    
    console.log(moviesInput)
    if (loading || movieLoading) {
        return "Data is Loading...!"
    }
    if (movieData) {
        console.log(movieData)
    }
    console.log(movieSearchData)
 
    if (data) {
        console.log(data.users)
    }
    return (<>
        {data && data.users.map((u) => {
            return <h4 key={u.id}>{u.name}</h4>
        })}
        {
            movieData.movies.map((m) => {
                return <h5 key={m.id}>{m.name}</h5>
            })
        }
        <div>
            <input type="text" placeholder="Interstellar" onChange={(event) => setMoviesInput(event.target.value)}/>
            <button onClick={() => {fetchMovie ({variables: {movie: moviesInput,}, });}}>Fetch Data</button>
        </div>
        <div>
            <h4>{movieSearchData && movieSearchData.movie.name}</h4>
        </div>

        
    </>
    )
}

export default DisplayData;