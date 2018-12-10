import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const GET_USER_BY_USERNAME = gql`
 query User($userName: String!) {
    getUserByUserName(userName: $userName ) 
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

const ShowUser = ({ userName }) => (
    <Query
      query={GET_USER_BY_USERNAME}
      variables={{ userName }}
//      pollInterval={2000}
      skip={!userName}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
  
        return (
          <div>
            <p>{`ID: ${data.getUserByUserName.id}`}</p>
            <p>{`Username: ${data.getUserByUserName.userName}`}</p>
            <p>{`Firstname: ${data.getUserByUserName.firstName} - Lastname: ${data.getUserByUserName.lastName}`}</p>
            <p>{`email: ${data.getUserByUserName.email}`}</p>         
            <p>{`created: ${data.getUserByUserName.created}`}</p>
            <p>{`lastUpdated: ${data.getUserByUserName.lastUpdated}`}</p>
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
            <h2>Show User by Username</h2>
            
              <ShowUser userName={"kw"} />
                       
          </div>
        </ApolloProvider>
      );
    }
   }
   
   
   
   
   export default App;