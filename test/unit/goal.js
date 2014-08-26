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

});

