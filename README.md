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

Usage
====

    nuwanda file.jpg

OR

    cat file.jpg | nuwanda

OR

    node index.js file.jpg

Tests
===
    npm test


Caveats
=======
No error handling for the moment

Inner working
=============
nuwanda is a readable stream that takes a stream as an input (stdin or file for instance).
As soon as it detects the progressive jpeg marker (0xff 0xc2), it emits a "progressive" event and stop reading the input (handy for bug files ...)


TODO
====
 * windows /linux tests
 * tests

Why
===
I wanted to easily detect if a jpeg is progressive or not, I love nodejs and I wanted to play with streams.

Thanks
======
substack for his node-stream handbook, node community in general

Licence
====
Do what you want. Have fun with JS.
