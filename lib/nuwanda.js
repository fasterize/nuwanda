var bufferedData,
    stream = require('stream'),
    util = require('util'),
    oldStream = false,
    buffered = false;

if (!stream.Readable) {
  stream = require('readable-stream');
  var oldStream = true;
  }

exports.Nuwanda = Nuwanda;

function Nuwanda(source, options) {
  var self = this;
  this.progressive = false;
  //options.buffer = true => just check a raw buffer
  if (options && options.buffer) {
    checkProgressiveFlag(source, function () {
      self.progressive = true;
    });
    return this;
  }

  if (!(this instanceof Nuwanda))
      return new Nuwanda(options);
  if (oldStream) {
    sourceStream = new stream.Readable()
    sourceStream.wrap(source);
  }
  else {
    sourceStream = source;
  }
  stream.Readable.call(this, options);
  this._source = sourceStream;


  sourceStream.on('readable', function () {
    self.read(0);
  });

  sourceStream.on('end', function () {
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
    self.emit('end');
    self.push(null);
  });
  this.push('');
};


//check if there is a 0xff 0xc2 marker in this chunk
//(a 0xff that would appear in compressed data is always followed by a 00)
//buffer the chunk if the marker spreads on two chunks
function checkProgressiveFlag(data, callback) {
  if (!data) {
    console.error('no data');
    return;
  }
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

