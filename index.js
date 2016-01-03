'use strict';
var jsonfile = require('jsonfile');
//var util = require('util');
var request = require('request');
var cheerio = require('cheerio');
var isNumeric = require("isnumeric");

var DEBUG = true;
function debug(str) {
  if (DEBUG) {
    console.log(str);
  }
}
var Counter = function(amount, cb){
  this.amount = amount;
  this.cb = cb;
};
Counter.prototype.count = function(){
  this.amount--;
  if(this.amount === 0){
    this.cb();
  }
};
var PronounGenius = function () {
  this.pronounData = null;
};
PronounGenius.prototype.discover = function (cb, force) {
  if (this.pronounData === null || force === true) {
    jsonfile.readFile(__dirname + '/pronoun-data.json', (function (err, obj) {
      if (!err) {
        this.pronounData = obj;
        debug("use existing file");
        cb(false, {failed: false, downloadRequired: false, forced: force || false});
      }
      else {
        debug("must download");
        this.forceDownload((function (err) {
          if (!err && this.pronounData !== null) {
            debug("download was great. WOOT!");
            cb(false, {failed: false, downloadRequired: true, forced: force || false, downloadForced: false});
          }
          else {
            debug("download didn't help me much :(");
            cb({
              error: true,
              "human": "You called the \"discover\" method and pronoun-genius determined it would need to create a new database file because no database file exists. This process failed. You can call \"forceDownload\" for a more specific error."
            }, {failed: true, downloadRequired: true, forced: force || false, downloadForced: false});
          }
        }).bind(this));
      }
    }).bind(this));
  }
};
PronounGenius.prototype.forceDownload = function (cb) {
  debug("This is not the downloader. This is close.");
  debug("THE MEMES ARE TOO REAL HERE!!!");
  var sites = require("./sites");
  var sitesCounter = new Counter(sites.length, (function(){
    debug("ALL SITES DONE");
    //console.log(this.pronounData);
    jsonfile.writeFile(__dirname + '/pronoun-data.json', this.pronounData, function (err) {
      if (err){
        console.error(err);
      }
      cb(false);
    });
  }).bind(this));

  console.log(sites);
  this.pronounData = [];
  sites.map((function (site) {
    request(site, (function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var $ = cheerio.load(body);
        $('a').attr('href', '');
        var content = body;
        if($('body').text() !== ""){
          content = $('body').text();
        }
        if ($("#mw-content-text").text() !== "") {
          content = $("#mw-content-text").text();
        }
        else if ($("#content").text() !== "") {
          content = $("#content").text();
        }

        //console.log(body); // Show the HTML for the Google homepage.
        var matches = content.match(/(\w{1,10})(\/|, |,)(\w{1,10})\2(\w{1,10})\2?(\w{1,10})?\2?(\w{1,10})?/g);
        var matchesCounter = new Counter(matches.length, (function(){
          debug("SITE DONE");
          sitesCounter.count();
        }).bind(this));
        matches.map((function (match) {
          //THE EVIL CHECKS: ENFORCE SAMENESS ON THE PRONOUNS!

          match = match.split(/(?:,|\/)+/);

          // Check #1: Pronouns can't be numbers
          for (var i = 0; i < match.length; i++) {
            if (isNumeric(match[i])) {
              matchesCounter.count();
              return;
            }
          }

          //Check #2: Reflexive ends with "self" or "selves"
          if (!(match[match.length - 1].endsWith("self") || match[match.length - 1].endsWith("selves"))) {
            matchesCounter.count();
            return;
          }

          // Check #3: Check for suspicious words
          var badWords = ['com'];
          for (i = 0; i < match.length; i++) {
            if (badWords.indexOf(match[i]) !== -1) {
              matchesCounter.count();
              return;
            }
          }

          // Try to get into the five string format
          if (match.length === 4) {
            match.push(match[3]);
            match[3] = "";
          }
          else if (match.length === 3) {
            match.push("");
            match.push(match[2]);
            match[2] = "";
          }
          for (i = 0; i < this.pronounData.length; i++) {
            var isMatch = true;
            for(var j = 0; j < this.pronounData[i].length; j++){
              if(this.pronounData[i][j].length > 0  && match[j].length > 0){
                if(this.pronounData[i][j] !== match[j]){
                  isMatch = false;
                }
              }
            }
            if(isMatch) {
              console.log(match);
              console.log(this.pronounData[i]);

              for (j = 0; j < this.pronounData[i].length; j++) {
                if(this.pronounData[i][j] === "" && match[j] !== ""){
                  this.pronounData[i][j] = match[j];
                }
              }
              matchesCounter.count();
              return;
            }
          }
          this.pronounData.push(match);
          matchesCounter.count();
          //console.log(match);

        }).bind(this));
      }
      else {
        debug("error connecting to " + site);
      }
    }).bind(this));
  }).bind(this));

};
PronounGenius.prototype.list = function (cb) {
  if (this.pronounData !== null) {
    debug("list available directly");
    cb(false, this.pronounData);
  }
  else {
    debug("must discover list");
    this.discover((function (err) {
      if (!err && this.pronounData !== null) {
        debug("list is available now. WOOT!");
        cb(false, this.pronounData);
      }
      else {
        debug("list is still unavailable. ick?!");
        cb({
          "error": true,
          "human": "The list of pronouns wasn't available when you called the \"list\" function and pronoun-genius failed to make it available. Check for additional errors and try calling the \"discover\" and \"forceDownload\" methods which may have more specific errors for you."
        });
      }
    }).bind(this));
  }
};
module.exports = new PronounGenius();
