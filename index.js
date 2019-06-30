const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const $ = require('jquery')
const bodyParser = require('body-parser')
const mongodb = require('mongodb');
const session = require('express-session')
const uri = 'mongodb://plamendbuser:Test1234!@ds263156.mlab.com:63156/dayana-portfolio';
const {
  SESSION_LIFETIME = 1000 * 60 * 60 * 2,
  SESSION_ID = 'session_id',
  NODE_ENV = 'development',
  IN_PROD = NODE_ENV === 'production',
  SESS_SECRET = 'AS!@#D'
} = process.env

const users = [
  { id: 1, name: "dany", email: "dany@gmail.com", password: "password" }
]

express()
  .use(bodyParser.json())
  .use(session({
    name: SESSION_ID,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    }
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('pages/about', { loggedIn: !!req.session.userId })
  })
  .get('/about', function (req, res) {
    res.render('pages/about', { loggedIn: !!req.session.userId })
  })
  .get('/admin', function (req, res) {
    res.render('pages/admin', { loggedIn: !!req.session.userId })
  })
  .post('/admin', function (req, res) {
    req.session.userId = 1
    res.redirect('/assignments')
  })
  .get('/logout', function (req, res) {
    req.session.destroy(err => {
      if (err) return res.redirect('/')
      res.clearCookie(SESSION_ID)
      res.redirect('/about')
    })
  })
  .get('/development_plan', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      var data = client.db('dayana-portfolio').collection('development_plans').find({})
      data.toArray().then()
        .then(
          data => {
            res.render('pages/development_plan', {
              developmentPlans: data,
              loggedIn: !!req.session.userId
            })
          },
          err => console.log(err)
        )
    })
  })
  .post('/development_plan', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      client
        .db('dayana-portfolio')
        .collection('development_plans')
        .insert(req.body, (err, data) => {
          if (err) throw err;
          res.redirect(req.originalUrl)
        })
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
              developmentRecords: data,
              loggedIn: !!req.session.userId
            })
          },
          err => console.log(err)
        )
    })
  })
  .post('/development_record', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      client
        .db('dayana-portfolio')
        .collection('development_records')
        .insert(req.body, (err, data) => {
          if (err) throw err;
          res.redirect(req.originalUrl)
        })
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
              assignmentRecords: data,
              loggedIn: !!req.session.userId
            })
          },
          err => console.log(err)
        )
    })
  })
  .post('/assignments', function (req, res) {
    mongodb.MongoClient.connect(uri, function (err, client) {
      if (err) throw err;
      client
        .db('dayana-portfolio')
        .collection('assignment_records')
        .insert(req.body)
    })
    res.redirect(req.get('referer'));
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))
