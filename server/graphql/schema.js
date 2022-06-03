const graphql = require('graphql');
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');

const themembersofafamily = [
    {id: 293209, families: [38382, 382983298,3282398], firstName: "Jake", lastName: "Bersani"},
  
  ]

  /*
    firestore member object looks like this
    id (seperate)
    member object =
    {
      firstName
      families array strings
      id: ''
    }
  */


const MemberType = new GraphQLObjectType({
    name: 'Member',
    description: 'This represents a member or person',
    fields: () => ({
      id: {
        type:  GraphQLID,
        description: "the individual member's id "
      },
      firstName: {
        type:  GraphQLString
      },
      lastName: {
        type:  GraphQLString
      },
      families: { 
        type: new GraphQLList(GraphQLID)
      }
  
    })
  });
  
  //root is the entry point for all the other types or queries
  const RootQueryType = new GraphQLObjectType({
      name: "Query",
      description: "Root Query",
      fields: () => ({
        members: {
          //because it'll be an array so a LIst
          type: new GraphQLList(MemberType),
          description: "List of All Members in Firebase under a user id",
          //in resolve this is the data we're going to use for this object's type (membertype)
          resolve: () => themembersofafamily
        },
       })
    });
  
  
  module.exports = {
      schema: new GraphQLSchema({
        query: RootQueryType,
      }),
      rootQueryType: RootQueryType
  }
  