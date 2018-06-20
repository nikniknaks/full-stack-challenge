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

  app.use('/api/employee/update',  (req, res, next) => {
    const employees = db.collection('employees')
    const objectId = ObjectId(req.body.employeeId)
    const response_doc = employees.update({
      _id: objectId
    },{
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      title: req.body.title,
    }).then(response => {
      res.send(response)
    })
  })

  app.use('/api/employees/', (req, res, next) => {
    const employees = db.collection('employees')
    employees.find({}).toArray((error, docs) => {
      res.send(docs)
    });
  })

  app.use('/api/employee/delete',  (req, res, next) => {
    const employees = db.collection('employees')
    const objectId = ObjectId(req.body.employeeId)
    employees.deleteOne({
      _id: objectId
    }).then(doc => {
      res.send(doc)
    })
  })

  app.use('/api/employee/:employeeId', (req, res, next) => {
    const employees = db.collection('employees')
    const objectId = ObjectId(req.params.employeeId)
    employees.findOne(objectId).then(doc => {
      res.send(doc)
    })
  })

  app.use('/api/review/add',  (req, res, next) => {
    const reviews = db.collection('reviews')
    const response_doc = reviews.insertOne({
      employeeId: req.body.employeeId,
      copy: req.body.copy,
    })
    res.send(response_doc)
  })

  app.use('/api/review/:employeeId', (req, res, next) => {
    const reviews = db.collection('reviews')
    reviews.findOne({employeeId: req.params.employeeId}).then(doc => {
      res.send(doc)
    })
  })

  app.use('/api/feedback_request/add', (req, res, next) => {
    const requests = db.collection('requests')
    const response_doc = requests.insertOne({
      requested_employee_id: req.body.requested_employee_id,
      subject_employee_id: req.body.subject_employee_id,
    })
    res.send(response_doc)
  })

  app.use('/api/feedback_request/index/:employeeId', (req, res, next) => {
    const requests = db.collection('requests')
    console.log()
    requests.find({
      subject_employee_id: req.params.employeeId,
    }).toArray((error, docs) => {
      res.send(docs)
    });
  })

  // employee routes/actions

  app.get('/api/employees/')

  app.post('/api/employee/add')

  app.post('/api/employee/delete')

  app.post('/api/employee/update')

  app.get('/api/employee/:employeeId')

  // review routes/actions

  app.get('/api/review/:employeeId')

  app.post('/api/review/add')

  app.post('/api/review/update')

  app.post('/api/review/delete')

  app.post('/api/feedback_request/add')

  app.post('/api/feedback_request/index/:employeeId')

  app.use(express.static(__dirname + '/public'))

  app.get('*', function (request, response){
      response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  })
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))
