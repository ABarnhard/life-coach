'use strict';

var Goal   = require('../models/goal'),
    moment = require('moment');

exports.new = function(req, res){
  res.render('goals/new');
};

exports.create = function(req, res){
  req.body.userId = res.locals.user._id;
  Goal.create(req.body, function(){
    res.redirect('/goals');
  });
};

exports.index = function(req, res){
  Goal.findAllByUserId(res.locals.user._id, function(err, goals){
    res.render('goals/index', {goals:goals, moment:moment});
  });
};

