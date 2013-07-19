var mocha = require('mocha'),
    should = require('should'),
    nuwanda = require('../lib/nuwanda').Nuwanda,
    assert = require('assert'),
    fs = require('fs');

var expected = {'dummy.jpg':false, 'progress.jpg':true, 'big.jpg':false, 'pig.jpg':true},
    results = {};

var count = 0;

describe('progressive ', function () {
  it('should be progressive', function (done) {
    Object.keys(expected).map(function (file) {
      var source = fs.createReadStream('./test/' + file);
      var progressiveCheck =  new nuwanda(source);
      progressiveCheck.on('progressive', function (flag) {
        count++;
        results[file] = flag;
        if (count === Object.keys(expected).length) {
          Object.keys(results).map(function(checkedFile) {
            results[checkedFile].should.equal(expected[checkedFile]);
          });
          done();
        }
      });
    });
  
  });
});


