const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLID } = require('graphql');

const themembersofafamily = [
  {id: 293209, families: [38382, 382983298,3282398], firstName: "Jake", lastName: "Bersani"},

]



const MemberType = new GraphQLObjectType({
  name: 'Member',
  description: 'This represents a member or person',
  fields: () => ({
    id: {
      type:  GraphQLInt,
      description: "the individual member's id "
    },
    firstName: {
      type:  GraphQLString
    },
    lastName: {
      type:  GraphQLString
    },
    families: { 
      type: new GraphQLList(GraphQLString)
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

const schema = new GraphQLSchema({
  query: RootQueryType
})


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: RootQueryType,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');