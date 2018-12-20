import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "https://www.ramsbone.dk/graphQL"
});

const GET_LOCATION_BLOG_BY_ID = gql`
 query LocationBlog($id: ID!) {
    getLocationBlogById(id: $id ) 
        {
            id
            info
            pos{
                longitude
    	        latitude
            }
            author
            likedBy
            created
            lastUpdated
        }
 }
`;

const ShowLocationBlog = ({ id }) => (
    <Query
      query={GET_LOCATION_BLOG_BY_ID}
      variables={{ id }}
//      pollInterval={2000}
      skip={!id}
    >
      {({ loading, error, data, refetch }) => {
        if (loading) return null;
        if (error) return `Error!: ${error}`;
  
        return (
          <div>
          <p>{`ID: ${data.getLocationBlogById.id}`}</p>
          <p>{`Info: ${data.getLocationBlogById.info}`}</p>
          <p>{`Position[ longitude: ${data.getLocationBlogById.pos.longitude}, latitude: ${data.getLocationBlogById.pos.latitude} ]`}</p>
          <p>{`author: ${data.getLocationBlogById.author}`}</p>
          <p>{`created: ${data.getLocationBlogById.created}`}</p>
          <p>{`lastUpdated: ${data.getLocationBlogById.lastUpdated}`}</p>
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
            <h2>Show LocationBlog by ID</h2>
            
              <ShowLocationBlog id={"5bfafbf2fffd221618e314c7"} />
                       
          </div>
        </ApolloProvider>
      );
    }
   }
   
   
   
   
   export default App;