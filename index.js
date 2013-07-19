var fs = require('fs'),
    nuwanda = require('./lib/nuwanda').Nuwanda;

var file = fs.createReadStream(process.argv[2]);

var progressiveCheck =  new nuwanda(file);

progressiveCheck.on('progressive', function (flag) {
  if (flag) console.log('progressive');
});
