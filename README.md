[![Stories in Ready](https://badge.waffle.io/messijs/messijs.png?label=ready&title=Ready)](https://waffle.io/messijs/messijs)
# MessiJS [![Build Status](https://travis-ci.org/MessiJS/MessiJS.png?branch=master)](https://travis-ci.org/MessiJS/MessiJS) [![Coverage Status](https://coveralls.io/repos/MessiJS/MessiJS/badge.png)](https://coveralls.io/r/MessiJS/MessiJS)

An easy to use message plugin for jQuery.

This is a continuation of the [Messi](https://github.com/marcosesperon/Messi) dialog.
When the original contributor stopped responding to Issues and Pull Requests, I created this fork of the Messi plugin.

All earlier edits are Copyright 2012-2013, Marcos Esperón: http://marcosesperon.es

See the [Contributors List](https://github.com/MessiJS/MessiJS/graphs/contributors)
to see who's contributed code.

## Goals
1. Version 2.x will be fully backward compatible: Drop in replacement for messi.js.
2. Standards based (Code validated by JSHint).
3. Well Tested.  Using Travis CI, with Mocha+Chai and against supported versions of jQuery.
4. Support Internet Explorer 9+ (previous versions did not support IE).

## Messi 1.x Documentation
The previous documentation begins here.  This will be rewritten before the final release of 2.0.0.

### About
Messi is a jQuery plugin to show clean, elegant messages in a simple way. With Messi you will avoid to use default JavaScript alert notifications or new windows to provide extended information to the user.

Display text, html content, images and ajax requests with 5KB code.

![Sample Image](http://marcosesperon.es/apps/messi/messi-white.png)

### Demo
[http://marcosesperon.es/apps/messi/](http://marcosesperon.es/apps/messi/)

### Setup instructions
Messi requires jQuery framework to work, so include it first of all in your project. After that, include in the `head` of your page the stylesheet:

```html
<link rel="stylesheet" href="messi.min.css" />
```
And before the `</body>` the script:

```html
<script src="messi.min.js"></script>
```

Now you can start using Messi in your page, for example:

```js
new Messi('This is a message with Messi.', {title: 'Title'});
```

You will find more examples at [http://marcosesperon.es/apps/messi/](http://marcosesperon.es/apps/messi/)

Enjoy it!

### Requirements
* [jQuery](http://jquery.com/) v. 1.7+

### License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
