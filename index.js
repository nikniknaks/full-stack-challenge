const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

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
  app.use('/employee/add',  (req, res, next) => {
    const employees = db.collection('employees')
    const response_doc = employees.insertOne({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      title: req.body.title,
    })
    res.send(response_doc)
  })
  app.use('/employees/', (req, res, next) => {
    const employees = db.collection('employees')
    const response_doc = employees.find({}).toArray((error, docs) => {
    });
    
    res.send(response_doc)
  })  
}

app.get('/', (req, res) => res.send('Full Stack Challenge'))

// employee routes/actions

app.get('/employees/')

app.post('/employee/add')
app.listen(3000, () => console.log('Example app listening on port 3000!'))
