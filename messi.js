/**
 * jQuery Messi Plugin 2.0
 * https://github.com/marcosesperon/jquery-messi
 *
 * Development continues as MessiJS.
 * http://MessiJS.github.io/
 *
 * Early versions Copyright 2012, Marcos Esperón
 * http://marcosesperon.es
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
// Main class
(function () {
    'use strict';

    function Messi(data, options) {

        var close;
        var _this = this;
        _this.options = jQuery.extend({}, Messi.prototype.options, options || {});

        // Prepare the item
        _this.messi = jQuery(_this.template);
        _this.setContent(data);

        // Adjust the title
        if (_this.options.title === null) {

            jQuery('.messi-titlebox', _this.messi)
                .remove();

        } else {

            jQuery('.messi-title', _this.messi)
                .append(_this.options.title);

            if (_this.options.buttons.length === 0 && !_this.options.autoclose) {

                if (_this.options.closeButton) {
                    close = jQuery('<span class="messi-closebtn"></span>');
                    close.bind('click', function () {
                        _this.hide();
                    });

                    jQuery('.messi-titlebox', this.messi)
                        .prepend(close);

                }

            }

            if (_this.options.titleClass !== null) {
                jQuery('.messi-titlebox', this.messi)
                    .addClass(_this.options.titleClass);
            }

        }

        // Adjust the width
        if (_this.options.width !== null) {
            jQuery('.messi-box', _this.messi)
                .css('width', _this.options.width);
        }

        // Prepare the buttons
        if (_this.options.buttons.length > 0) {

            var btnCallback = function () {
                _this.options.callback.call(this.value);
            };

            for (var i = 0; i < _this.options.buttons.length; i++) {

                var cls = (_this.options.buttons[i]['class']) ? _this.options.buttons[i]['class'] : '';
                var btn = '<button data-value="' + _this.options.buttons[i].val + '" class="btn ' + cls + '" href="#">' + _this.options.buttons[i].label + '</button>';
                btn = jQuery('<div class="btnbox">' + btn + '</div>', {});

                jQuery('.messi-actions', this.messi)
                    .append(btn);

                jQuery(document)
                    .delegate('.messi-actions button', 'click', function () {
                        var after = null;
                        var value = jQuery(this)
                            .data('value');

                        if (typeof _this.options.callback === 'function') {
                            after = btnCallback;
                        }
                        _this.hide(after);
                    });


            }

        } else {

            jQuery('.messi-footbox', this.messi)
                .remove();

        }

        // Prepare the close button automatically
        if (_this.options.buttons.length === 0 && _this.options.title === null && !_this.options.autoclose) {

            if (_this.options.closeButton) {
                close = jQuery('<span class="messi-closebtn"></span>');
                close.bind('click', function () {
                    _this.hide();
                });

                jQuery('.messi-content', this.messi)
                    .prepend(close);

            }

        }

        // Activate the modal screen
        _this.modal = (_this.options.modal) ? jQuery('<div class="messi-modal"></div>')
            .css({
                opacity: _this.options.modalOpacity,
                width: jQuery(document).width(),
                height: jQuery(document).height(),
                'z-index': _this.options.zIndex + jQuery('.messi').length
            })
            .appendTo(document.body) : null;

        // Show the message
        if (_this.options.show) { _this.show(); }

        // Control the resizing of the display
        jQuery(window)
            .bind('resize scroll', function () {
                _this.resize();
            });

        // Configure the automatic closing
        if (_this.options.autoclose !== null) {
            setTimeout(function (_this) {
                var value = jQuery.data(this, 'value');
                var after = (_this.options.callback !== null) ? function () {
                        _this.options.callback(value);
                    } : null;
                _this.hide(after);
            }, _this.options.autoclose, this);
        }

        return _this;

    }

    Messi.prototype = {

        options: {
            autoclose: null,                       // autoclose message after 'x' miliseconds, i.e: 5000
            buttons: [],                           // array of buttons, i.e: [{id: 'ok', label: 'OK', val: 'OK'}]
            callback: null,                        // callback function after close message
            center: true,                          // center message on screen
            closeButton: true,                     // show close button in header title (or content if buttons array is empty).
            height: 'auto',                        // content height
            title: null,                           // message title
            titleClass: null,                      // title style: info, warning, success, error
            minMargin: 15,                         // set how much minimal space there should be (in pixels) when the nudge function moves the popup back into the window
            modal: false,                          // shows message in modal (loads background)
            modalOpacity: 0.2,                     // modal background opacity
            padding: '10px',                       // content padding
            show: true,                            // show message after load
            unload: true,                          // unload message after hide
            viewport: { top: '0px', left: '0px' }, // if not center message, sets X and Y position
            width: '500px',                        // message width
            zIndex: 99999                          // message z-index
        },
        template: '<div class="messi"><div class="messi-box"><div class="messi-wrapper"><div class="messi-titlebox"><span class="messi-title"></span></div><div class="messi-content"></div><div class="messi-footbox"><div class="messi-actions"></div></div></div></div></div>',
        content: '<div></div>',
        visible: false,

        setContent: function (data) {
            jQuery('.messi-content', this.messi)
                .css({
                    padding: this.options.padding,
                    height: this.options.height
                })
                .empty()
                .append(data);
        },

        viewport: function () {

            return {
                top: ((jQuery(window).height() - this.messi.height()) / 2) + jQuery(window).scrollTop() + 'px',
                left: ((jQuery(window).width() - this.messi.width()) / 2) + jQuery(window).scrollLeft() + 'px'
            };

        },

        show: function () {

            if (this.visible) { return; }

            if (this.messi.parent().length === 0) {
                // or unload in case of first call
                if (this.modal) {
                    this.modal.appendTo(document.body);
                }
                this.messi.appendTo(document.body);
            }

            if (this.modal) {
                this.modal.show();
            }

            // Get the center of the screen if the center option is on
            if (this.options.center) {
                this.options.viewport = this.viewport(jQuery('.messi-box', this.messi));
            } else {
                this.nudge();
            }

            this.messi
                .css({
                    top: this.options.viewport.top,
                    left: this.options.viewport.left,
                    'z-index': this.options.zIndex + jQuery('.messi').length
                })
                .show()
                .animate({ opacity: 1 }, 300);

            // Cancel the scroll
            //document.documentElement.style.overflow = "hidden";

            this.visible = true;

        },

        hide: function (after) {

            if (!this.visible) { return; }
            var _this = this;

            if (typeof after === 'function') {
                if (after.call(this) === false) {
                    return this;
                }
            }

            this.messi.animate({
                opacity: 0
            }, 300, function () {
                if (_this.modal) {
                    _this.modal.css({
                        display: 'none'
                    });
                }
                _this.messi.css({
                    display: 'none'
                });

                // Reactivate the scroll
                //document.documentElement.style.overflow = "visible";
                _this.visible = false;
                if (_this.options.unload) {
                    _this.unload();
                }
            });

            return this;

        },

        resize: function () {
            if (this.options.modal) {
                jQuery('.messi-modal')
                    .css({
                        width: jQuery(document).width(),
                        height: jQuery(document).height()
                    });
            }
            if (this.options.center) {
                this.options.viewport = this.viewport(jQuery('.messi-box', this.messi));
                this.messi.css({
                    top: this.options.viewport.top,
                    left: this.options.viewport.left
                });
            }
        },

        toggle: function () {
            this[this.visible ? 'hide' : 'show']();
            return this;
        },

        unload: function () {
            if (this.visible) {
                this.hide();
            }

            jQuery(window)
                .unbind('resize scroll', function () {
                    this.resize();
                });

            if (this.modal) {
                this.modal.remove();
            }

            this.messi.remove();
        },

        nudge: function () {
            // this.options.viewport.top, this.options.viewport.left
            var win = jQuery(window);
            var x = (this.options.viewport.left).replace('px', '');
            var y = (this.options.viewport.top).replace('px', '');

            if (this.isNumber(x) && this.isNumber(y)) {
                x = parseInt(x, 10);
                y = parseInt(y, 10);

                // When the popup is too far on the right, change the viewport  to the left
                var xtreme = jQuery(document).scrollLeft() + win.width() - this.messi.width() - this.options.minMargin;
                if (x > xtreme) {
                    x -= this.messi.width() + 2 * this.options.minMargin;
                }
                x = this.max(x, 0);

                // When the popup is too far down, move popup up
                if ((y + this.messi.height()) > (win.height() + jQuery(document).scrollTop())) {
                    y -= this.messi.height() + this.options.minMargin;
                }
                this.options.viewport.left = x.toString() + 'px';
                this.options.viewport.top = y.toString() + 'px';
            }
        },

        max: function (a, b) {
            if (a > b) { return a; }
            else { return b; }
        },

        isNumber: function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

    };

    // Special Call
    jQuery.extend(Messi, {

        alert: function (data, callback, options) {

            var buttons = [{
                id: 'ok',
                label: 'OK',
                val: 'OK'
            }];

            options = jQuery.extend({
                closeButton: false,
                buttons: buttons,
                callback: function () {}
            }, options || {}, {
                show: true,
                unload: true,
                callback: callback
            });

            return new Messi(data, options);

        },

        ask: function (data, callback, options) {

            var buttons = [
                { id: 'yes', label: 'Yes', val: 'Y', 'class': 'btn-success' },
                { id: 'no', label: 'No', val: 'N', 'class': 'btn-danger' }
            ];

            options = jQuery.extend({
                closeButton: false,
                modal: true,
                buttons: buttons,
                callback: function () {}
            }, options || {}, {
                show: true,
                unload: true,
                callback: callback
            });

            return new Messi(data, options);

        },

        img: function (src, options) {

            var img = new Image();

            jQuery(img).load(function () {

                var vp = {
                    width: jQuery(window).width() - 50,
                    height: jQuery(window).height() - 50
                };
                var ratio = (this.width > vp.width || this.height > vp.height) ? Math.min(vp.width / this.width, vp.height / this.height) : 1;

                jQuery(img)
                    .css({
                        width: this.width * ratio,
                        height: this.height * ratio
                    });

                options = jQuery.extend(options || {}, {
                    show:         true,
                    unload:       true,
                    closeButton:  true,
                    width:        this.width * ratio,
                    height:       this.height * ratio,
                    padding:      0
                });

                new Messi(img, options);

            })
            .error(function () {

                // Be IE friendly
                if (typeof window.console === 'object') {
                    console.log('Error loading ' + src);
                }

            })
            .attr('src', src);

        },

        load: function (url, options) {

            options = jQuery.extend(options || {}, {
                show: true,
                unload: true,
                params: {}
            });

            var request = {
                url: url,
                data: options.params,
                dataType: 'html',
                cache: false,
                error: function (request, status, error) {
                    // Be IE friendly
                    if (typeof window.console === 'object') {
                        console.log(request.responseText);
                    }
                },
                success: function (html) {
                    new Messi(html, options);
                }
            };

            jQuery.ajax(request);

        }

    });

    // Preserve backward compatibility
    window.Messi = Messi;

    // Put Messi into the jQuery namespace
    jQuery.Messi = Messi;

})();
// vim: expandtab shiftwidth=4 tabstop=4 softtabstop=4:
