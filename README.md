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
genius can discover complete or partial sets of pronouns on websites. It makes a bunch of guesses to do this. It is not a neural network and it doesn't work on a classification based system. Training a network would be resource intensive and genius only needs to work on a limited set of websites introduced to the "sites.json" file. It will work on simple websites (and for those it is built for), but if you start trying to complicate things, false positives are sure to arise.
 
genius can discover a whole array of formats. In the initial release, it will also discover sets with only three items (the last one being a reflexive), but these have a high likelihood of being misclassified and this feature may be removed.
```
he, him, his, his, himself
he,him,his,his,himself
he/him/his/his/himself
he/him/his/himself ("his" is assumed to be both possessive determiner and possessive pronoun)
```

genius won't detect mixed use of `/` and `,`. These instances will be ignored. The deliminator must be consistent to be recognized. 

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
