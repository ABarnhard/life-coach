'use strict';

function Goal(o){
  this.name = o.name;
  this.due = new Date(o.due);
  this.tags = o.tags.split(',').map(function(tag){return tag.trim();});
  this.userId = o.userId;
}

Object.defineProperty(Goal, 'collection', {
  get: function(){return global.mongodb.collection('goals');}
});

Goal.create = function(o, cb){
  var g = new Goal(o);
  Goal.collection.save(g, cb);
};

Goal.findAllByUserId = function(id, cb){
  Goal.collection.find({userId:id}).toArray(cb);
};

module.exports = Goal;

