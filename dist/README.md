# MessiJS
[![Build Status](https://travis-ci.org/MessiJS/MessiJS.png?branch=master)](https://travis-ci.org/MessiJS/MessiJS)
[![Coverage Status](https://coveralls.io/repos/MessiJS/MessiJS/badge.png)](https://coveralls.io/r/MessiJS/MessiJS)
[![Stories in Ready](https://badge.waffle.io/messijs/messijs.png?label=ready&title=Ready)](https://waffle.io/messijs/messijs)

**A simple, elegant message plugin for jQuery.**

MessiJS is a plugin for jQuery that shows messages in a clean,
elegant and simple way. With MessiJS, you no longer need to use the
ugly default Javascript alert notification. MessiJS also provides
a nice, flexible way to get feedback from your users without blocking
Javascript execution.

Display text, html content, images and ajax requests with 5KB code.

![MessiJS Example](http://messijs.github.io/MessiJS/images/messijs.png)

This is a continuation of the [Messi](https://github.com/marcosesperon/Messi) dialog.
When the original contributor stopped responding to Issues and Pull Requests, I created this fork of the Messi plugin.

All earlier edits are Copyright 2012-2013, Marcos Esperón: http://marcosesperon.es

Version 2.0.1 and newer includes the goodness of [animate.css](https://github.com/daneden/animate.css).

See the [Contributors List](https://github.com/MessiJS/MessiJS/graphs/contributors)
to see who's contributed code.

MessiJS is available via [Bower](http://bower.io/search/?q=messijs) or [NPM](https://www.npmjs.com/package/messijs). If you prefer manual installation, see the instructions below.

## Requirements
* [jQuery](http://jquery.com/) version 1.7 or greater

## Roadmap
### MessiJS 2.1
1. Version 2.1 will maintain backward compatibility with Version 2.0.
2. Version 2.1 will no longer be dependent on jQuery.
3. Like 2.0, well tested and bug fixed.
4. Ideas to improve MessiJS?  Open a [Github Issue](https://github.com/MessiJS/MessiJS/issues) and let me know.

### MessiJS 2.0
1. Name change and new maintainer.
2. Version 2.x will be mostly backward compatible with 1.x. It's a drop-in replacement for 1.x.
3. Standards based (code validated by JSHint).
4. Well Tested.  Using Travis CI, with Mocha+Chai and against supported versions of jQuery.
5. Adheres to [Semantic Versioning](http://semver.org).
6. Supports Internet Explorer 9+ (previous versions did not officially support IE).

# Options and Demo
1. [MessiJS Options](http://messijs.github.io/MessiJS/options/)
2. [MessiJS Demos](http://messijs.github.io/MessiJS/demos/)

## How to use
MessiJS requires jQuery to work, so include it first of all in your project. After that, include in the `head` of your page the stylesheet:

```html
<head>
  <link rel="stylesheet" href="messi.min.css" />
</head>
<body>
  <div> Content here...</div>
  <script src="jquery.min.js"></script>
  <script src="messi.min.js"></script>
</body>
```

Use MessiJS in your page, like this:

```js
new Messi('This is a message with Messi.', {title: 'Title'});
```

Please, use, enjoy, and leave me [feedback](https://github.com/MessiJS/MessiJS/issues).

## Messi 1.x

The original Messi 1.x documentation can be found at [http://marcosesperon.es/apps/messi/](http://marcosesperon.es/apps/messi/)
