const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient

new Promise((resolve, reject) => {
  MongoClient.connect('mongodb://localhost:27017', (err, client) =>  {
    
    if (err) reject(err)

    console.log("Connected successfully to server")

    const db = client.db('full-stack-challenge')
    resolve(db)
  })
}).then(db => {
  defineMiddleWare(db)
}).catch(e => {
  console.log(e)
})

// middleware (express.js) i.e. functions that perform actions between the request and the response

const defineMiddleWare = db => {
}

app.get('/', (req, res) => res.send('Full Stack Challenge'))

// employee routes/actions

app.post('/employee/add')
app.listen(3000, () => console.log('Example app listening on port 3000!'))
