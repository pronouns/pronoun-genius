#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

> Neopronoun aggregation tool

This is a tool for aggregating English \[neo\]pronouns OTF or for storage in a cutesy little database. Pronouns are "discovered" from a list of websites using a regular expression (basically some hella wicked automagic). This could be used in a web application to allow users to pick cool pronouns for their profiles. It was developed for use in a future projects of mine to allow better user pronoun selection options.

## Install

```sh
$ npm install --save pronoun-genius
```


## Usage

```js
var pronounGenius = require('pronoun-genius');

pronounGenius.list(function(err, list){
  console.log(list);
  // the console has been overwhelmed by third person pronouns
});
```

```sh
$ npm install --global pronoun-genius
$ pronoun-genius --help
```

## Discovery algorithm 
genius can discover

## Further reading on neopronouns
* https://en.wikipedia.org/wiki/Gender-specific_and_gender-neutral_pronouns
* http://nonbinary.org/wiki/Pronouns

## License

MIT © [Falkirks](http://falkirks.com)


[npm-image]: https://badge.fury.io/js/pronoun-genius.svg
[npm-url]: https://npmjs.org/package/pronoun-genius
[travis-image]: https://travis-ci.org/Falkirks/pronoun-genius.svg?branch=master
[travis-url]: https://travis-ci.org/Falkirks/pronoun-genius
[daviddm-image]: https://david-dm.org/Falkirks/pronoun-genius.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Falkirks/pronoun-genius
