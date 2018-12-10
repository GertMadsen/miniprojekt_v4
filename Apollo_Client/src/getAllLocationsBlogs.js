import React from "react";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

//Each of the examples uses their own server, you need to find the URI's for each
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

const BLOGS_QUERY = gql`
{
    getAllLocationBlogs {
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
`

const GetAllLocationBlogs = () => (
  <Query query={BLOGS_QUERY} >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.getAllLocationBlogs.map(({ id, info, pos, author, likedBy, created, lastUpdated }) => (
        <div key={id}>
          <p>{`ID: ${id}`}</p>
          <p>{`Info: ${info}`}</p>
          <p>{`Position[ longitude: ${pos.longitude}, latitude: ${pos.latitude} ]`}</p>
          <p>{`author: ${author}`}</p>
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
      <h2>Show all Location-Blogs:</h2>
      <GetAllLocationBlogs/>
    </div>
  </ApolloProvider>
);

export default App;
