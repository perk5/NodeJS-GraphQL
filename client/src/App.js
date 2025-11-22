import './App.css';
import { ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import DisplayData from './DisplayData.js'

function App() {
  const link = new HttpLink({
    uri: 'http://localhost:4000/graphql',
  });

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>List of Users</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
