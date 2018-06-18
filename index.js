const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID

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
  app.use('/api/employee/add',  (req, res, next) => {
    const employees = db.collection('employees')
    const response_doc = employees.insertOne({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      title: req.body.title,
    })
    res.send(response_doc)
  })
  app.use('/api/employees/', (req, res, next) => {
    const employees = db.collection('employees')
    employees.find({}).toArray((error, docs) => {
      res.send(docs)
    });
  })
  app.use('/api/employee/:employeeId', (req, res, next) => {
    const employees = db.collection('employees')
    const objectId = ObjectId(req.params.employeeId)
    employees.findOne(objectId).then(doc => {
      res.send(doc)
    })
  })
}

// employee routes/actions

app.get('/api/employees/')

app.get('/api/employee/:employeeId')

app.post('/api/employee/add')

app.post('/api/employee/remove')

app.post('/api/employee/update')

// review routes/actions

app.get('/api/review/')

app.post('/api/review/add')

app.post('/api/review/update')

app.use(express.static(__dirname + '/public'))

app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
