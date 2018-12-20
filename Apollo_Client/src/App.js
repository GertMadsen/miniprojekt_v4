import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "http://www.ramsbone.dk/graphql"
});

const EXCHANGE_QUERY = gql`
{
  getAllUsers{
    id
    userName
  }
}
`

const ExchangeRates = () => (
  <Query query={EXCHANGE_QUERY} >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllUsers.map(({ id, userName }) => (
        <div key={id}>
          <p>{`${id}: ${userName}`}</p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>This is where you should add your Query-components</h2>
      <ExchangeRates/>
    </div>
  </ApolloProvider>
);

export default App;
