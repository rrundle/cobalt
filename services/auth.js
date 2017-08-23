var async = require('async');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
var moment = require('moment');
var fs = require('fs');
var request = require('request');
//var User = require('../models/auth.model.js');
var uuidLong = require('node-uuid');

exports.login = function(req, res) {
  var formData = {userAlreadyExists: null};

  //Expand formData object from request body:
  formData.email = req.body.email;
  formData.password = req.body.password;

  //start cascade of authentication functions:
  async.waterfall([getUserByEmail, verifyUserPassword], respond);

  function getUserByEmail(callback) {
    console.log("checking for user with email: " + formData.email);
    User.getUserByUsername(
      formData.email,
      function(err, users) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        if(users.length > 0) {
          formData.userAlreadyExists = true;
          var user = users[0];
          console.log('Found user with email: ' + user.email);
          return callback(null, user);
        } else {
          formData.userAlreadyExists = false;
          console.log('Did not find existing user with email: ' + formData.email);
          return callback(null, formData, {});
        }
      }
    );
  }

  function verifyUserPassword(user, callback) {
    bcrypt.compare(formData.password, user.password, function(err, isMatch) {
      console.log(formData.password)
      console.log(user.password)
      console.log(isMatch)
      if (err) {
        return callback(err);
      }

      if (isMatch) {
        console.log('Password match!');
        delete user.password;
        callback(null, user);
      }

      else {
        return callback({message: 'Incorrect password'});
      }
    })
  }

  function respond(err, user) {
    console.log('response running')
    if(err) {
      //res.setHeader('Access-Control-Allow-Origin', '*');
      return res.jsonp(err);
    }

    else {
      console.log('Responding to client with: ');
      console.log(createToken(user, true));
      let userDetails = {
        name: user.name,
        email: user.email,
      };
      return res.jsonp({token: createToken(user, true), userDetails: userDetails});
    }
  }

};

exports.createPassword = function(req, res) {
  var formData = {
    password: req.body.password
  };
  console.log(formData);

  async.waterfall([generatePassword], respond);

  function generatePassword( callback ) {
    // Encrypt Password
    bcrypt.genSalt( 10, function ( err, salt ) {
      if ( err ) {
        console.log('salt could not be generated')
        return callback( {error: 'Salt could not be generated'} );
      }
      bcrypt.hash( formData.password, salt, function ( err, hash ) {
        if ( err ) {
          console.log('password could not be generated')
          return callback( {error: 'Password could not be generated'} );
        }
        formData.password = hash;
        console.log('hashing!');
        return callback( null, formData );
      } );
    } );
  }

  function respond(err, data) {
    console.log(data)
    if(err) {
      console.log('error')
      return res.jsonp(err);
    } 
    else {
      return res.jsonp({password: data.password});
    }
  }
};




exports.updateImage = function(req,res) {
  var UUID = req.body.UUID;
  var image = req.body.image1;
  var number = req.body.number;
  var property = "image"+number;
  User.updateImage(UUID,image,property,function(err,response) {
    if(err){
      console.log(err);
      return res.jsonp(err);
    }
    return res.jsonp({status:true});
  });

};

function createToken(user) {
  var payload = {
    sub: user.id,
    UUID: user.UUID,
    name: user.name,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(180, 'days').unix()
  };

  return jwt.sign(payload, 'secret');
}