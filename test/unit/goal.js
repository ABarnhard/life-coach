/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Goal      = require('../../app/models/goal'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'life-coach-test';

describe('Goal', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Goal object', function(done){
      var reqBody = {name:'Be a Plumber', due:'2015-02-02', tags:'job, career', userId: Mongo.ObjectID('000000000000000000000001')};
      Goal.create(reqBody, function(err, g){
        expect(g).to.be.instanceof(Goal);
        expect(g.userId).to.be.instanceof(Mongo.ObjectID);
        expect(g._id).to.be.instanceof(Mongo.ObjectID);
        expect(g.name).to.equal('Be a Plumber');
        expect(g.due).to.be.instanceof(Date);
        expect(g.tags).to.have.length(2);
        expect(g.tasks).to.have.length(0);
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find all goals by a user ID', function(done){
      var id = Mongo.ObjectID('000000000000000000000001');
      Goal.findAllByUserId(id, function(err, goals){
        expect(goals).to.have.length(2);
        done();
      });
    });
  });

  describe('.findByIdForUser', function(){
    it('should return goal (user IDs match)', function(done){
      var goalId = 'a00000000000000000000002',
          userId = Mongo.ObjectID('000000000000000000000001');
      Goal.findByIdForUser(goalId, userId, function(err, goal){
        expect(goal).to.be.ok;
        done();
      });
    });
    it('should return null (user IDs don\'t match)', function(done){
      var goalId = 'a00000000000000000000003',
          userId = Mongo.ObjectID('000000000000000000000001');
      Goal.findByIdForUser(goalId, userId, function(err, goal){
        expect(goal).to.be.null;
        done();
      });
    });
  });

  describe('.addTask', function(){
    it('should add a task to users goal', function(done){
      var goalId = 'a00000000000000000000002',
          body = {name:'Buy Coveralls', difficulty:'Hard', description:'Go to store & buy', rank:'4'},
          userId = Mongo.ObjectID('000000000000000000000001');
      Goal.addTask(body, goalId, userId, function(err, goal){
        expect(goal.tasks).to.have.length(1);
        expect(goal.tasks[0].rank).to.equal(4);
        done();
      });
    });
    it('should not add a task to non-logged in users goal', function(done){
      var goalId = 'a00000000000000000000003',
          body = {name:'Buy Coveralls', difficulty:'Hard', description:'Go to store & buy', rank:'4'},
          userId = Mongo.ObjectID('000000000000000000000001');
      Goal.addTask(body, goalId, userId, function(err, goal){
        expect(goal).to.be.undefined;
        done();
      });
    });
  });

});

