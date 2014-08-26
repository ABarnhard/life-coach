/* global describe, before, beforeEach, it */

'use strict';

process.env.PORT = 5555;
process.env.DB   = 'life-coach-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../app/index'),
    cookie  = null,
    request = require('supertest');

describe('goals', function(){
  before(function(done){
    request(app).get('/').end(done);
  });
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app).post('/login').send('email=bob@aol.com').send('password=abc').end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /', function(){
    it('should fetch the home page', function(done){
      request(app).get('/').end(function(err, res){
        // console.log(res);
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Home');
        done();
      });
    });
  });

  describe('get /goals/new', function(){
    it('should show the new goals page', function(done){
      request(app).get('/goals/new').set('cookie', cookie).end(function(err, res){
        // console.log(res);
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Name');
        expect(res.text).to.include('Due');
        expect(res.text).to.include('Tags');
        done();
      });
    });
  });

  describe('post /goals', function(){
    it('should redirect the page', function(done){
      request(app).post('/goals').set('cookie', cookie).send('name=Be+a+Plumber&due=2015-02-02&tags=job%2C+career').end(function(err, res){
        // console.log(res);
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

  describe('get /goals', function(){
    it('should show the goals page', function(done){
      request(app).get('/goals').set('cookie', cookie).end(function(err, res){
        // console.log(res);
        expect(res.status).to.equal(200);
        expect(res.text).to.include('plumber');
        expect(res.text).to.include('marathon');
        done();
      });
    });
  });

  describe('get /goals/3', function(){
    it('should show a specific goals page', function(done){
      request(app).get('/goals/a00000000000000000000002').set('cookie', cookie).end(function(err, res){
        // console.log(res);
        expect(res.status).to.equal(200);
        expect(res.text).to.include('marathon');
        done();
      });
    });
    it('should expect to get a 302 (not logged in users goal)', function(done){
      request(app).get('/goals/a00000000000000000000003').set('cookie', cookie).end(function(err, res){
        // console.log(res);
        expect(res.status).to.equal(302);
        done();
      });
    });
  });

});
