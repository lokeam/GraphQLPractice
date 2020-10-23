const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

/* in absence of a database in this example, using hardcoded list of users */
const users = [
  { id: '23',
    firstName: 'Idris',
    age: '48'
  },
  {
    id: '27',
    firstName: 'Ruth',
    age: '38'
  }
]

/* dictates properties GQL object needs */
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString},
    age: {type: GraphQLInt}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
       type: UserType,
       args: {  id: { type: GraphQLString }},
       resolve(parentValue, args) {
         return _.find(users, { id: args.id });
       }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});