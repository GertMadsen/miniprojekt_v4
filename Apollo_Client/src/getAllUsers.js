import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "https://www.ramsbone.dk/graphQLl"
});

const USERS_QUERY = gql`
{
    getAllUsers{
    id
    userName
    firstName
    lastName
    email
    job {
      type
      company
      companyUrl
    }
    created
    lastUpdated
  }
}
`

const GetAllUsers = () => (
  <Query query={USERS_QUERY} >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllUsers.map(({ id, userName, firstName, lastName, email, job, created, lastUpdated }) => (
        <div key={id}>
          <p>{`ID: ${id}`}</p>
          <p>{`Username: ${userName}`}</p>
          <p>{`Firstname: ${firstName} - Lastname: ${lastName}`}</p>
          <p>{`email: ${email}`}</p>         
          <p>{`created: ${created}`}</p>
          <p>{`lastUpdated: ${lastUpdated}`}</p>
        
          <br/>

        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Show All Users:</h2>
      <GetAllUsers/>
    </div>
  </ApolloProvider>
);

export default App;
