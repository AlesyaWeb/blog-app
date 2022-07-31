// import { join } from 'path';
const {join} = require('path')
const {readdirSync, readFileSync} = require('fs')
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import resolvers from './resolvers/';
const resolvers = require('./resolvers/')
const {applyMiddleware} = require('graphql-middleware')
console.log(resolvers)
const {makeExecutableSchema} = require('@graphql-tools/schema')
const middleware  = require("./../middlewares");
const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
    typeDefs += readFileSync(join(__dirname, './typedefs', file), {
        encoding: 'utf8',
    });
});
console.log(typeDefs)
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const schemaWithMiddleware = applyMiddleware(schema, ...middleware)
module.exports = schema