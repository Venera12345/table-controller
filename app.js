const express = require('express')
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/key')
const path = require('path')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')
const bodyParser = require('body-parser')
const cors = require('cors')
mongoose.connect(keys.mongooseURI)
    .then(() => {
        console.log('mongoose connect')
    })
    .catch((error) => {
        console.log(error)
    })
app.use(cors())
app.use('/graphql', bodyParser.json(), graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: true
}))
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('table/dist/client'))
    app.get('*', (req, res)=>{
        res.sendFile(
            path.resolve(
                __dirname, 'table', 'dist', 'table', 'index.html'
            )
        )
    })
}
module.exports = app
