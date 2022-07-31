require('dotenv').config()
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const schema = require('./graphql/schema')
const sequelize = require('./db')
// const app = require('./app')
const models = require('./db/models/models.js')
const fileUpload = require('express-fileupload')
const path = require('path')
const {graphqlUploadExpress} = require('graphql-upload')
const {User, Like, Comment, Post} = require('./db/models/models.js')
const {Post_content} = require("./db/models/models");
const {ApolloServer, AuthenticationError} = require("apollo-server-express");
const authMiddleware = require('./middlewares/authMiddleware')
const checkRoleMiddleware = require('./middlewares/checkRoleMiddleware')
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT
const app = express();
app.disable("x-powered-by");
console.log(__dirname)
app.use(express.static(path.join(__dirname, './uploads')))
app.use('/uploads', express.static('uploads'));
app.use(graphqlUploadExpress())
app.use(express.static('client/build'));
app.use(express.static('admin/build'))
app.get('/admin', (req,res) =>
    res.sendFile(path.resolve(__dirname, 'admin/build', 'index.html'))
})
app.get('/blog', (req, res) => {
    console.log('heyyy')
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'))
})
app.get('', (req, res) => {
    console.log(req.params)
    console.log('------------------------------------------------------------------------------------')
    res.redirect('/blog/')
})
app.use(cors());
(async () => {
    const apolloServer = new ApolloServer({
        schema: schema,
        context: async ({ req, res, next }) => ({req, res, next}),
        uploads: false
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true });
})();

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('hq')
        app.listen(3007, () => {
            console.log('Graphql server listening on port 3001!');
        });
    }
    catch (e) {
        console.log(e)
    }
}

start()