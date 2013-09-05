Nuwanda ![nuwanda logo](https://github.com/fasterize/nuwanda/blob/master/nuwanda.gif?raw=true)
======

Check if an image is a progressive jpg or not.

Why _nuwanda_ ? See the Dead Poets Society.

Requirements
------------

NodeJS >= v0.8 (http://nodejs.org/)

Modules installation
-----------------
nuwanda can be used and installed globally (there's a binary)

    npm install nuwanda -g


Supported env
------------
* only tested on macosx

windows and linux support in the next version 

[![Build Status](https://travis-ci.org/fasterize/nuwanda.png)](https://travis-ci.org/fasterize/nuwanda)


Usage
====

command-line

    nuwanda file.jpg

OR pipe a jpg to it

    cat file.jpg | nuwanda

OR with the provided index.js file 

    node index.js file.jpg

OR as a module, just listen to the progressive event. The emitted value is true if the jpg is progressive, false if not (?! ;-)

```javascript
var fs = require('fs'),
    nuwanda = require('nuwanda').Nuwanda;

var file = fs.createReadStream(process.argv[2]);

var progressiveCheck =  new nuwanda(file);

progressiveCheck.on('progressive', function (flag) {
  if (flag) console.log('progressive');
});

```

OR as a module but with a raw buffer
```javascript
var fs = require('fs'),
    nuwanda = require('nuwanda').Nuwanda;

var file = fs.readFileSync(process.argv[2]);

var flag =  (new nuwanda(file, {buffer:true})).progressive;

if (flag) console.log('progressive');
```



Tests
===
    npm test


Caveats
=======
Not so much error handling for the moment

Inner working
=============
nuwanda is a readable stream that takes a stream as an input (stdin or file for instance).
As soon as it detects the progressive jpeg marker (0xff 0xc2), it emits a "progressive" event and stop reading the input (handy for bug files ...)


TODO
====
 * windows /linux tests

Why
===
I wanted to easily detect if a jpeg is progressive or not, I love nodejs and I wanted to play with streams.

Thanks
======
substack for his node-stream handbook, node community in general

Licence
====
Do what you want. Have fun with JS.
