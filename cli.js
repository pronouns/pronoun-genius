#!/usr/bin/env node
'use strict';
var meow = require('meow');
var pronounGenius = require('./');

var cli = meow({
  help: [
    'Usage',
    '  pronoun-genius <input>',
    '',
    'Example',
    '  pronoun-genius Unicorn'
  ].join('\n')
});

pronounGenius.list(function(err, list){
  console.log(list);
});
