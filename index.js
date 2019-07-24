const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const $ = require('jquery')
const bodyParser = require('body-parser')
// const mongodb = require('mongodb');
const session = require('express-session')
const mongoose = require('mongoose');
const uri = 'mongodb://plamendbuser:Test1234!@ds263156.mlab.com:63156/dayana-portfolio';
const MongoStore = require('connect-mongo')(session);
var logged_in_user = true;


mongoose.connect(uri);
mongoose.Promise = global.Promise;
const db = mongoose.connection

const {
  SESSION_LIFETIME = 1000 * 60 * 60 * 2,
  SESSION_ID = 'session_id',
  NODE_ENV = 'development',
  IN_PROD = NODE_ENV === 'production',
  SESS_SECRET = 'AS!@#D'
} = process.env

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded())
  .use(session({
    name: SESSION_ID,
    resave: true,
    saveUninitialized: true,
    secret: SESS_SECRET,
    store: new MongoStore({
      mongooseConnection: db
    }),
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
    res.render('pages/about', { loggedIn: logged_in_user })
  })
  .get('/about', function (req, res) {
    res.render('pages/about', { loggedIn: logged_in_user })
  })
  .get('/admin', function (req, res) {
    res.render('pages/admin', { loggedIn: logged_in_user })
  })
  .post('/admin', function (req, res) {
    if (req.body.username === "dany" && req.body.password === "d@y4nA") {
      logged_in_user = true
    }
    res.redirect('/about')

    // var data = db.collection('users')
    //   .find({ user: req.body.username, pass: req.body.password });

    // data.toArray().then()
    //   .then(
    //     data => {
    //       if (data.length) {
    //         console.log("########## SUCCESS LOGIN!")
    //         req.session.userId = true
    //         console.log(req.session)
    //         console.log(req.session.userId)
    //         res.redirect('/about')
    //       } else {
    //         console.log("########## COULDN'T LOGIN")
    //       }
    //     },
    //     err => alert("couln't login")
    //   )
  })
  .get('/logout', function (req, res) {
    logged_in_user = false;
    res.redirect('/about')
    // req.session.destroy(err => {
    //   if (err) return res.redirect('/')
    //   res.clearCookie(SESSION_ID)
    //   res.redirect('/about')
    // })
  })
  .get('/development_plan', function (req, res) {
    var data = db.collection('development_plans').find({})
    data.toArray().then()
      .then(
        data => {
          res.render('pages/development_plan', {
            developmentPlans: data,
            loggedIn: logged_in_user
          })
        },
        err => console.log(err)
      )
  })
  .post('/development_plan', function (req, res) {
    db.collection('development_plans')
      .insertOne(req.body, (err, data) => {
        if (err) throw err;
        res.redirect(req.originalUrl)
      })
  })
  .put('/development_plan', function (req, res) {
    db.collection('development_plans')
      .updateOne(
        { "_id": mongoose.Types.ObjectId(req.body.id) },
        { $set: req.body },
      )
      .then(() => {
        res.status(200).json({ status: "ok" })
      }, (err) => {
        console.log("Err on update: ")
        console.log(err)
      })
  })
  .delete('/development_plan', function (req, res) {
    db.collection('development_plans')
      .deleteOne({ "_id": mongoose.Types.ObjectId(req.body.id) })
      .then(() => {
        res.status(200).json({ status: "ok" })
      })
  })



  .get('/development_record', function (req, res) {
    var data = db.collection('development_records').find({})
    data.toArray().then()
      .then(
        data => {
          res.render('pages/development_record', {
            developmentRecords: data,
            loggedIn: logged_in_user
          })
        },
        err => console.log(err)
      )
  })
  .post('/development_record', function (req, res) {
    db.collection('development_records')
      .insert(req.body, (err, data) => {
        if (err) throw err;
        res.redirect(req.originalUrl)
      })
  })
  .put('/development_record', function (req, res) {
    db.collection('development_records')
      .updateOne(
        { "_id": mongoose.Types.ObjectId(req.body.id) },
        { $set: req.body },
      )
      .then(() => {
        res.status(200).json({ status: "ok" })
      }, (err) => {
        console.log("Err on update: ")
        console.log(err)
      })
  })
  .delete('/development_record', function (req, res) {
    db.collection('development_records')
      .deleteOne({ "_id": mongoose.Types.ObjectId(req.body.id) })
      .then(() => {
        res.status(200).json({ status: "ok" })
      })
  })


  .get('/assignments', function (req, res) {

    var data = db.collection('assignment_records').find({})
    data.toArray().then()
      .then(
        data => {
          res.render('pages/assignment_records', {
            assignmentRecords: data,
            loggedIn: logged_in_user
          })
        },
        err => console.log(err)
      )
  })
  .post('/assignments', function (req, res) {

    db.collection('assignment_records')
      .insert(req.body)
    res.redirect(req.get('referer'));
  })
  .put('/assignments', function (req, res) {
    db.collection('assignment_records')
      .updateOne(
        { "_id": mongoose.Types.ObjectId(req.body.id) },
        { $set: req.body },
      )
      .then(() => {
        res.status(200).json({ status: "ok" })
      }, (err) => {
        console.log("Err on update: ")
        console.log(err)
      })
  })
  .delete('/assignments', function (req, res) {
    db.collection('assignment_records')
      .deleteOne({ "_id": mongoose.Types.ObjectId(req.body.id) })
      .then(() => {
        res.status(200).json({ status: "ok" })
      })
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`))
