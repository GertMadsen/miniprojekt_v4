import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const GET_USER_BY_ID = gql`
 query User($id: ID!) {
    getUserById(id: $id ) 
        {
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
`;

const ShowUser = ({ id }) => (
    <Query
      query={GET_USER_BY_ID}
      variables={{ id }}
//      pollInterval={2000}
      skip={!id}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
  
        return (
          <div>
            <p>{`ID: ${data.getUserById.id}`}</p>
            <p>{`Username: ${data.getUserById.userName}`}</p>
            <p>{`Firstname: ${data.getUserById.firstName} - Lastname: ${data.getUserById.lastName}`}</p>
            <p>{`email: ${data.getUserById.email}`}</p>         
            <p>{`created: ${data.getUserById.created}`}</p>
            <p>{`lastUpdated: ${data.getUserById.lastUpdated}`}</p>
          </div>
        );
      }}
    </Query>
  );

  class App extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <div>
            <h2>Show User by ID</h2>
            
              <ShowUser id={"5bfafbf1fffd221618e314b8"} />
                       
          </div>
        </ApolloProvider>
      );
    }
   }
   
   
   
   
   export default App;