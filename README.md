[![Stories in Ready](https://badge.waffle.io/messijs/messijs.png?label=ready&title=Ready)](https://waffle.io/messijs/messijs)
# MessiJS [![Build Status](https://travis-ci.org/MessiJS/MessiJS.png?branch=master)](https://travis-ci.org/MessiJS/MessiJS) [![Coverage Status](https://coveralls.io/repos/MessiJS/MessiJS/badge.png)](https://coveralls.io/r/MessiJS/MessiJS)

**An easy to use message plugin for jQuery.**

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

See the [Contributors List](https://github.com/MessiJS/MessiJS/graphs/contributors)
to see who's contributed code.

## Requirements
* [jQuery](http://jquery.com/) version 1.7 or greater

## Roadmap
### MessiJS 2.1
1. To allow for growth, Version 2.1 won't be backward compatible with the original Messi or MessiJS 2.0.
2. I'm considering making MessiJS more jQuery standards compliant (with a compatibility extension).
3. Many bug fixes and more tests.
4. Ideas to improve MessiJS?  Open a [Github Issue](https://github.com/MessiJS/MessiJS/issues) and let me know.

#### MessiJS 2.0
1. Version 2.0.x will be fully backward compatible: Drop in replacement for messi.js.
2. Standards based (Code validated by JSHint).
3. Well Tested.  Using Travis CI, with Mocha+Chai and against supported versions of jQuery.
4. Support Internet Explorer 9+ (previous versions did not support IE).

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
