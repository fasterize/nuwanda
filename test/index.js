var mocha = require('mocha'),
    should = require('should'),
    nuwanda = require('../lib/nuwanda').Nuwanda,
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

describe('buffer source option', function (){
  it('should be handled', function () {
    Object.keys(expected).map(function (file) {
      var source = fs.readFileSync('./test/' + file);
      var progressiveCheck =  new nuwanda(source, {buffer:true}).progressive;
      results[file] = progressiveCheck;
    });
    Object.keys(results).map(function(checkedFile) {
      results[checkedFile].should.equal(expected[checkedFile]);
    });
  });
});

describe('when no data is passed', function (){
  it('nothing happens in buffer mode', function () {
    var source = undefined;
    var progressiveCheck =  new nuwanda(source, {buffer:true}).progressive;
    progressiveCheck.should.be.false;
  });
  it('nothing happens in stream mode', function () {
    var source = undefined;
    var progressiveCheck =  new nuwanda(source);
    progressiveCheck.on('progressive', function (flag) {
        done();
    });
  });
});
