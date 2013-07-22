var fs = require('fs'),
    nuwanda = require('./lib/nuwanda').Nuwanda;

var file = fs.readFileSync(process.argv[2]);

var flag =  (new nuwanda(file, {buffer:true})).progressive;

if (flag) console.log('progressive');
