
var  resolvers = require('./resolvers');
var { makeExecutableSchema } = require('graphql-tools');
var mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const typeDefs = `
    scalar DateTime
    
    type Job {
        type: String
        company: String
        companyUrl: String
    }

    type User {
        id: ID
        userName: String
        firstName: String
        lastName: String
        password: String
        email: String
        job: [Job]
        created: DateTime
        lastUpdated: DateTime       
    }
    
    type Pos {
        longitude: Float
        latitude: Float
    }

    type LocationBlog {
        id: ID
        info: String
        img: String
        pos: Pos
        author: ID
        likedBy: [ID]
        created: DateTime
        lastUpdated: DateTime 
    }

    type Friend {
        username: String
        longitude: Float
        latitude: Float
    }

    type Friends {
        friends: [Friend]
    }

    input loginInput {
        username: String! 
        password: String! 
        longitude: Float! 
        latitude: Float!
        distance: Int!
    }

    input newUser {
        firstName: String!
        lastName: String! 
        userName: String!
        password: String!
        email: String!
    }

    type Query {
        getUserById(id: ID!): User
        getUserByUserName(userName: String!): User
        getAllUsers: [User]
        getLocationBlogById(id: ID!): LocationBlog
        getLocationBlogByInfo(info: String!): LocationBlog
        getAllLocationBlogs: [LocationBlog]
        loginToFindNearbyFriends(input: loginInput!): Friends     
    }

    type Mutation {
        addUser(input: newUser!): User
    }

  `;

const schema = makeExecutableSchema({ typeDefs, resolvers});


module.exports = { schema };