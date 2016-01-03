'use strict';
var assert = require('assert');
var pronounGenius = require('../');

describe('pronoun-genius node module', function () {
  it('must be able to discover and list pronouns', function () {
    pronounGenius.list(function(err){
      assert(false, err);
    });
  });
});
