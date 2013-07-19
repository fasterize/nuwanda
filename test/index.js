var mocha = require('mocha')
    fs = require('fs');

var checkProgressiveFlag = require('../lib/nuwanda').checkProgressiveFlag;

fs.readFile('./dummy.jpg', checkProgressiveFlag);
fs.readFile('./progress.jpg', checkProgressiveFlag);
