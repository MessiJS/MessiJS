TO DO:
======

The goal is to take the Messi message dialog and move it to the next level.  The original author is unresponsive.

If you are interested, send me Pull Requests and I'll review them.  I'll try to add the Pull Requests that have
been already issued for the official Messi repo.

* In the current build, the messi.min.js works but the messi.js is broken.
* A Gruntfile.js needs to be created to manage testing and minifying.
* Tests—preferably in Mocha+Sinon—need to be written.
* Messi does not play nice with other Javascript.  It needs to be wrapped in an IIFE so it's no longer in the
  global scope.
