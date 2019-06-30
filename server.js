/*
 * Copyright (c) 2017 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Written with: mongodb@3.0.2
 * Documentation: https://mongodb.github.io/node-mongodb-native/
 * A Node script connecting to a MongoDB database given a MongoDB Connection URI.
*/

const mongodb = require('mongodb');

// Create seed data


let development_record_data = [
  {
    key_dates: 'September 18',
    what_did_you_do: 'My first presentation in Career Development course',
    why: 'It was part of my future evaluation ',
    what_did_you_learn_from_this: 'I became more confident in speaking in front of an audience exposing my personal point of view in more complex topics',
    how_will_you_use_this: 'This experience would be of great help when I need to present future projects at work ot university'
  }
];

let assignments_data = [
  {
    name_of_subject: 'Career management and development',
    title_of_assignment: 'Assignment 1',
    evaluation: '6',
    file: 'file url'
  }
];

let development_plan_data = [
  {
    what_do_i_need_to_learn: 'How to use more complex terminology in the HR field',
    what_will_i_do_to_achieve_this: 'Read more related articles',
    what_resources_or_support_will_i_need: 'Literature, dictionaries',
    what_will_my_success_criteria_be: 'When I start to use the complex grammar not only in written but also verbally',
    target_dates_for_review_and_completion: 'September 19'
  }
];

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname

let uri = 'mongodb://plamendbuser:Test1234!@ds263156.mlab.com:63156/dayana-portfolio';

mongodb.MongoClient.connect(uri, function (err, client) {

  if (err) throw err;

  /*
   * Get the database from the client. Nothing is required to create a
   * new database, it is created automatically when we insert.
   */

  let db = client.db('dayana-portfolio')

  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */
  // let development_plan = db.collection('development_plans');
  // let development_record = db.collection('development_records');
  // let assignment_records = db.collection('assignment_records');

  db.collection('development_plans').find({}, function (err, data) {
    if (err) throw err;
    console.log(data)
  })
  // Note that the insert method can take either an array or a dict.

  //  development_plan.insert(development_plan_data, function(err, result) {});
  //  development_record.insert(development_record_data, function(err, result) {});
  //  assignment_records.insert(assignments_data, function(err, result) {});

  // if(err) throw err;

  /*
   * Then we need to give Boyz II Men credit for their contribution
   * to the hit "One Sweet Day".
   */

  // songs.update(
  //   { song: 'One Sweet Day' },
  //   { $set: { artist: 'Mariah Carey ft. Boyz II Men' } },
  //   function (err, result) {

  //     if(err) throw err;

  //     /*
  //      * Finally we run a query which returns all the hits that spend 10 or
  //      * more weeks at number 1.
  //      */

  //     songs.find({ weeksAtOne : { $gte: 10 } }).sort({ decade: 1 }).toArray(function (err, docs) {

  //       if(err) throw err;

  //       docs.forEach(function (doc) {
  //         console.log(
  //           'In the ' + doc['decade'] + ', ' + doc['song'] + ' by ' + doc['artist'] +
  //           ' topped the charts for ' + doc['weeksAtOne'] + ' straight weeks.'
  //         );
  //       });

  //       // Since this is an example, we'll clean up after ourselves.
  //       songs.drop(function (err) {
  //         if(err) throw err;

  //         // Only close the connection when your app is terminating.
  //         client.close(function (err) {
  //           if(err) throw err;
  //         });
  //       });
  //     });
  //   }
  // );

});
