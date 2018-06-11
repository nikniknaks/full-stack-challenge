const express = require('express')
const app = express()

const MongoClient = require('mongodb').MongoClient
  MongoClient.connect('mongodb://localhost:27017', (err, client) =>  {
    
    if (err) reject(err)

    console.log("Connected successfully to server")

    const db = client.db('full-stack-challenge')
  })
app.get('/', (req, res) => res.send('Full Stack Challenge'))

// employee routes/actions

app.post('/employee/add')
app.listen(3000, () => console.log('Example app listening on port 3000!'))
