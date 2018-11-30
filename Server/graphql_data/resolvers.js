var { DateTime } = require('@okgrow/graphql-scalars');
var userFacade = require("../facades/userFacade");
var blogFacade = require("../facades/blogFacade");
var loginFacade = require("../facades/loginFacade");

const resolvers = {

    DateTime,

    Query: {

        getUserById: (root, {id}) => {
            return userFacade.findById(id);
        },

        getUserByUserName: (root, {userName}) => {
            return userFacade.findByUsername(userName);
        },

        getAllUsers: () => {
            return userFacade.getAllUsers();
        },

        getLocationBlogById: (root, {id}) => {
            return blogFacade.findById(id);
        },

        getLocationBlogByInfo: (root, {info}) => {
            return blogFacade.findByInfo(info);
        },

        getAllLocationBlogs: () => {
            return blogFacade.getAllBlogs();
        },

        loginToFindNearbyFriends: (root, {input}) => {
            return loginFacade.login(input.username,input.password,input.longitude,input.latitude,input.distance);
        }
        
    },

    Mutation: {
        addUser: (root, {input}) => {
            return userFacade.addUser(input.firstName, input.lastName, input.userName, input.password, input.email);        
        },

    }

};

module.exports = resolvers;