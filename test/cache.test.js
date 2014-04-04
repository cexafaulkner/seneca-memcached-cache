/* Copyright (c) 2013 Richard Rodger */
"use strict";


// run memcached for this to work!

var seneca = require('seneca')()
seneca.use('..')


var assert = require('assert')


describe('memcached', function(){

  var cache = seneca.pin({role:'cache',cmd:'*'})

  it('set1', function(cb) {
    cache.set({key:'a1',val:'b1'},function(err,out){
      assert.ok(null==err)
      assert.equal(out,'a1')
      cb()
    })
  })


  it('get1', function(cb) {
    cache.get({key:'a1'},function(err,out){
      assert.ok(null==err)
      assert.equal('b1',out)
      cb()
    })
  })


  it('set2', function(cb) {
    cache.set({key:'c1',val:0},function(err,out){
      assert.ok(null==err)
      assert.ok(out)
      cb()
    })
  })

  it('incr1', function(cb) {
    cache.incr({key:'c1',val:1},function(err,out){
      assert.ok(null==err)
      assert.equal(out,1)
      cb()
    })
  })

  it('get2', function(cb) {
    cache.get({key:'c1'},function(err,out){
      assert.ok(null==err)
      assert.equal(1,out)
      cb()
    })
  })

  it('incr2', function(cb) {
    cache.incr({key:'c1',val:1},function(err,out){
      assert.ok(null==err)
      assert.equal(out,2)
      cb()
    })
  })

  it('get3', function(cb) {
    cache.get({key:'c1'},function(err,out){
      assert.ok(null==err)
      assert.equal(2,out)
      cb()
    })
  })

  it('delete', function (cb) {
    cache.delete({key:'c1'},function(err,out){
      assert.ok(null==err)
      assert.equal(out,'c1')
      cb()
    })
  });

  it('add', function(cb) {
    cache.add({key:'d1',val:'e1'},function(err,out){
      console.log(err);
      assert.ok(null==err)
      assert.equal(out,'d1')
      cb()
    })
  })

  it('won\'t add if key already exists', function(cb) {
    cache.add({key:'d1',val:'e2'},function(err,out){
      assert(err)
      cb()
    })
  })

  it('won\'t delete if key does not exist', function (cb) {
    cache.delete({key:'zzz'},function(err,out){
      assert.ok(null==err)
      assert.equal(out,'zzz')
      cb()
    })
  });

  it('won\'t incr unless value is an integer', function(cb) {
    cache.incr({key: 'd1', val: 1}, function(err, out) {
      assert(err);
      cb();
    });
  });

})
