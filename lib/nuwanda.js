var bufferedData,
    stream = require('stream'),
    util = require('util'),
    buffered = false;

if (!stream.Readable) {
  //stream = require('readable-stream');
  }

exports.checkProgressiveFlag = checkProgressiveFlag;
exports.Nuwanda = Nuwanda;

function Nuwanda(source, options) {
  if (!(this instanceof Nuwanda))
      return new Nuwanda(options);
  stream.Readable.call(this, options);
  this._source = source;
  this.progressive = false;

  var self = this;

  source.on('readable', function () {
    self.read(0);
  });

  source.on('end', function () {
    if (!self.progressive) self.emit('progressive', self.progressive);
  });
}

util.inherits(Nuwanda, stream.Readable);

Nuwanda.prototype._read = function(n) {
  var self = this;
  var chunk = this._source.read();
  checkProgressiveFlag(chunk, function () {
    self.progressive = true;
    self.emit('progressive', self.progressive);
    self.push(null);
  });
  this.push('');
};


//check if there is a 0xff 0xc2 marker in this chunk
//(a 0xff that would appear in compressed data is always followed by a 00)
//buffer the chunk if the marker spreads on two chunks
function checkProgressiveFlag(data, callback) {
  if (!data) return;
  if (!buffered && data[data.length-1] === 255) {
    bufferedData = data;
    buffered = true;
  } 
  else if (buffered) {
    data = Buffer.concat([bufferedData,data]);
    buffered = false;
  }
  for (var i=0;i<data.length-1;i++) {
    if (data[i] === 255 && data[i+1] === 194) {
      if (callback) {
        callback();
      }
    } 
  }
}

