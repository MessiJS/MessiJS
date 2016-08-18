---
layout: github
title: Options
---
# MessiJS Options

Option            | Default                                 | Description
----------------- | --------------------------------------- | ----------------------------------------------------------------------
animate[²](#201)  | {&nbsp;open:&nbsp;'bounceIn',<br>&nbsp;&nbsp;close:&nbsp;'bounceOut'&nbsp;} | default animation<br>(disable by setting animate: false)<br>See [Animate.css](http://daneden.github.io/animate.css) for valid options.
autoclose         | null                                    | autoclose after 'x' milliseconds
buttons           | [ ]                                     | array of buttons<br>e.g. [{id: 'yes', label: 'Yes', val: 'Yes'}]
callback          | null                                    | callback function after close message
center            | true                                    | center message on screen
closeButton       | true                                    | show close button in header title
height            | 'auto'                                  | content height
title             | null                                    | message title
titleClass        | null                                    | title style: info, warning, success, error
margin            | 0                                       | enforce a viewport the dialog cannot move outside, set zero to disable
modal             | false                                   | shows the message in modal style<br>(loads the background)
modalOpacity      | 0.2                                     | modal background opacity
padding           | '10px'                                  | content padding
position[¹](#200) | { top: '0px',<br>left: '0px' }          | if center: false, sets X and Y position
show              | true                                    | show message after load
unload            | true                                    | unload message after hide
viewport          | { top: '0px',<br>left: '0px' }          | deprecated, see position
width             | '500px'                                 | message width
zIndex            | 99999                                   | message z-index

<a name="201">1. _Introduced in MessiJS 2.0.0._</a><br>
<a name="201">2. _Introduced in MessiJS 2.0.1._</a>
