const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, rootQueryType } = require('./graphql/schema');
const cors = require('cors');

/*Set up Admin API for Firebase*/
const admin = require('firebase-admin');
const { collection, QuerySnapshot,  } = require('firebase/firestore');
//Define path to secret key generated for service account
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
//Initialize the app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const users = db.collection("users/kuLO5TxTnaawA5v3UOlLXmX6fVv2/members").get().then((QuerySnapshot)=>{
  QuerySnapshot.forEach((doc)=> {
    console.log(doc.id)
    console.log(doc.data())
  })
})

app.use( cors() )
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootQueryType,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

