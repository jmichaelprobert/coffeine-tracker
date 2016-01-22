// server.js

  // setup =====================================================================
  var express = require('express');
  var app = express ();                    // create app w/ express
      assert = require('assert');
  var mongoose = require('mongoose');      // mongoose for mongodb
  var morgan = require('morgan');          // log requests to console (express4)
  var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
  var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

  // configuration =============================================================
  // connect to mongoDB on modulus.io
  mongoose.connect('mongodb://localhost:27017/coffeine', function(err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
  });

  app.use(express.static(__dirname + '/public'));                // set the static files location /public/img will be /img for users
  app.use(morgan('dev'));                                        // log every request to the console
  app.use(bodyParser.urlencoded({'extended': 'true'}));          // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());                                    // parse application/json
  app.use(bodyParser.json({ type: 'application/bnd.api+json'})); // parse application/vnd.api+json as json
  app.use(methodOverride());

  // define models =============================================================
  var brew = mongoose.model(
      'brew',
          {
            'date'          : Date,
            'barista'       : String,
            'brewMethod'    : String,
          },
      'brews'
      );

  var brewMethod = mongoose.model(
      'brewMethod',
          {
            'type'          : String,
            'ounces'        : Number,
            'grams-o-beans' : Number,
            'shame'         : Boolean
          },
      'brewMethods'
    );


     // modules ================================================================

     /*var listBrews =
         // use mongoose to get all brews in the database
         brew.find(function(err, res) {

             // if there is an error retrieving, send the error. nothing after res.send(err)
             if (err)
                 res.send(err)

             res.json(brews); // return all todos in JSON format
         });*/

     // routes =================================================================

          // api ---------------------------------------------------------------
          // get all brews
          app.get('/api/brews', function(req, res) {

            brew.find(function(err, brews) {
                if (err)
                    res.send(err)
                res.json(brews);
            });
          });

          // get all brewMethods
          app.get('/api/brewMethods', function(req, res) {

              // use mongoose to get all brewMethods in the database
              brewMethod.find(function(err, brewMethods) {

                    // if there is an error retrieving, send the error. nothing after res.send(err)
                    if (err)
                        res.send(err)

                    res.json(brewMethods); // return all brewMethods in JSON format
              });
          });

          // create brew
          app.post('/api/brews', function(req, res) {

              // create a brew, information from an AJAX request from Angular
              brew.create({
                  'date'        : req.body.date,
                  'barista'     : req.body.barista,
                  'brewMethod'  : req.body.brewMethod

              }, function(err, brews) {
                  if (err)
                      res.send(err);

                  console.log('Brew Logged | ' + req.body.barista + " brewed a " + req.body.brewMethod+" on " + req.body.date)

                  brew.find(function(err, brews) {
                      if (err)
                          res.send(err)
                      res.json(brews);
                  });
              });

          });

          // delete a brew
          app.delete('/api/brews/:brew_id', function(req, res) {
              brew.remove({
                  _id : req.params.brew_id
              }, function(err, brews) {
                  if (err)
                      res.send(err);

                  console.log('Brew Deleted | ' + req.body.barista + " didn't brew a " + req.body.brewMethod+" on "+req.body.date);
                  // get and return all the todos after you create another
                  brew.find(function(err, brews) {
                      if (err)
                          res.send(err)
                      res.json(brews);
                  });

              });
          });


  // application ---------------------------------------------------------------
     app.get('*', function(req, res) {
         res.sendFile('/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
     });

  // listen (start app with node server.js) ====================================
  app.listen(4000);
  console.log("App listening on port 4000");
