const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const $ = require('jquery')
const mongodb = require('mongodb');
const uri = 'mongodb://plamendbuser:Test1234!@ds263156.mlab.com:63156/dayana-portfolio';

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/about'))
  .get('/portfolio', function (req, res) {
    res.render('pages/portfolio')
  })
  .get('/about', function (req, res) {
    res.render('pages/about')
  })
  .get('/development_plan', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      var data = client.db('dayana-portfolio').collection('development_plans').find({})
      data.toArray().then()
        .then(
          data => {
            res.render('pages/development_plan', {
              developmentPlans: data
            })
          },
          err => console.log(err)
        )
    })
  })
  .get('/development_record', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      var data = client.db('dayana-portfolio').collection('development_records').find({})
      data.toArray().then()
        .then(
          data => {
            res.render('pages/development_record', {
              developmentRecords: data
            })
          },
          err => console.log(err)
        )
    })
  })
  .get('/assignments', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      var data = client.db('dayana-portfolio').collection('assignment_records').find({})
      data.toArray().then()
        .then(
          data => {
            res.render('pages/assignment_records', {
              assignmentRecords: data
            })
          },
          err => console.log(err)
        )
    })
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
