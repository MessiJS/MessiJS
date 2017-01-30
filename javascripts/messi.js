/**!
 * messijs - A easy to use message plugin for jQuery
 * @version 2.0.2
 * @link https://MessiJS.github.io/
 * @license MIT
 * @copyright Copyright 2012-13 Marcos Esperón
 * @copyright Copyright 2014-17 Kevin Gustavson
 */
(function () {
    'use strict';

    // initialize
    function Messi(data, options) {

        var close;
        var _this = this;
        _this.options = jQuery.extend({}, Messi.prototype.options, options || {});

        // Resolve the viewport vs prototype option (prototype overrides viewport)
        if (this.options.position === Messi.prototype.options.position) {
            _this.options.position = _this.options.viewport;
        }

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

                // Close button required
                close = jQuery('<span class="messi-closebtn"></span>');
                close.on('click.MessiJS', function () {
                    _this.hide();
                });

                jQuery('.messi-titlebox', this.messi)
                    .prepend(close);

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

            for (var i = 0; i < _this.options.buttons.length; i++) {
                var btnbox = jQuery('<div>', {'class':'messi-btnbox'})
                    .css('width', parseInt(100/_this.options.buttons.length, 10) + '%');
                var cls = (_this.options.buttons[i]['class']) ? _this.options.buttons[i]['class'] : '';
                var btn = jQuery('<button>', {
                    href: '#',
                    'class': 'btn ' + cls,
                    value: _this.options.buttons[i].val,
                    'click': function () {
                        var value = $(this).val();

                        if (typeof _this.options.callback === 'function') {
                            if (_this.options.callback(value) === false) {
                                return this;
                            }
                        }

                        _this.hide();
                    }
                }).text(_this.options.buttons[i].label);

                btnbox.append(btn);
                jQuery('.messi-actions', this.messi).append(btnbox);

            }

        } else {

            jQuery('.messi-footbox', this.messi)
                .remove();

        }

        // Prepare the close button automatically
        if (_this.options.buttons.length === 0 && _this.options.title === null && !_this.options.autoclose) {

            if (_this.options.closeButton) {
                close = jQuery('<span class="messi-closebtn"></span>');
                close.on('click.MessiJS', function () {
                    _this.hide();
                });

                jQuery('.messi-content', this.messi)
                    .prepend(close);

            }

        }

        // Activate the modal screen
        if (_this.options.modal) {
            _this.modal = jQuery('<div class="messi-modal"></div>')
                .css({
                    opacity: _this.options.modalOpacity,
                    width: jQuery(document).width(),
                    height: jQuery(document).height(),
                    position: 'fixed',
                    'z-index': _this.options.zIndex + jQuery('.messi').length
                })
                .appendTo(document.body);
        }

        // Show the message
        if (_this.options.show) { _this.show(); }

        // Configure the automatic closing
        if (_this.options.autoclose !== null) {
            setTimeout(function () {
                var value = jQuery.data(this, 'value');
                var after = (_this.options.callback !== null) ? function () {
                        _this.options.callback(value);
                    } : null;
                _this.hide();
            }, _this.options.autoclose, this);
        }

        return _this;

    }

    Messi.prototype = {

        options: {
            animate: { open: 'bounceIn', close: 'bounceOut' },  // default animation (disable by setting animate: false)
            autoclose: null,                                    // autoclose message after 'x' miliseconds, i.e: 5000
            buttons: [],                                        // array of buttons, i.e: [{id: 'ok', label: 'OK', val: 'OK'}]
            callback: null,                                     // callback function after close message
            center: true,                                       // center message on screen
            closeButton: true,                                  // show close button in header title (or content if buttons array is empty).
            height: 'auto',                                     // content height
            title: null,                                        // message title
            titleClass: null,                                   // title style: info, warning, success, error
            margin: 0,                                          // enforce a minimal viewport margin the dialog cannot move outside, set to zero to disable
            modal: false,                                       // shows message in modal (loads background)
            modalOpacity: 0.2,                                  // modal background opacity
            padding: '10px',                                    // content padding
            position: { top: '0px', left: '0px' },              // if center: false, sets X and Y position
            show: true,                                         // show message after load
            unload: true,                                       // unload message after hide
            viewport: { top: '0px', left: '0px' },              // deprecated, see position
            width: '500px',                                     // message width
            zIndex: 99999                                       // first dialog z-index
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

        center: function () {
            this.messi.css({
                top: ((jQuery(window).height() - this.messi.height()) / 2),
                left: ((jQuery(window).width() - this.messi.width()) / 2)
            });

            return this;
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

            // positioning
            this.messi.css({
                top: this.options.position.top,
                left: this.options.position.left
            });

            this.messi.css({
                'zIndex': this.options.zIndex + jQuery('.messi').length
            });

            // animation
            if (this.options.animate) {
                this.messi.addClass('animated '+this.options.animate.open);
            }

            this.messi.show();

            // Get the center of the screen if the center option is on
            if (this.options.center) {
                this.center();
            } else {
                this.enforceMargin();
            }

            // Cancel the scroll
            //document.documentElement.style.overflow = "hidden";

            this.visible = true;

            // Control the resizing of the display
            jQuery(window).on('resize.MessiJS scroll.MessiJS', this, Messi.prototype.resize);
        },

        hide: function () {

            if (!this.visible) { return; }
            var _this = this;

            if (this.options.animate) {
                this.messi.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    _this.visible = false;

                    if (_this.options.modal) {
                        _this.modal.css({ display: 'none' });
                    }

                    // FIXME disabling option `unload: false`, needs to be re-enabled
                    // if (_this.options.unload) {
                        _this.unload();
                    // }
                });

                this.messi.removeClass(this.options.animate.open).addClass(this.options.animate.close);
            } else {
                if (_this.options.modal) {
                    _this.modal.css({ display: 'none' });
                }

                _this.messi.css({ display: 'none' });

                // Reactivate the scroll
                //document.documentElement.style.overflow = "visible";

                _this.visible = false;

                // FIXME disabling option `unload: false`, needs to be re-enabled
                // if (_this.options.unload) {
                    _this.unload();
                // }
            }

            return this;

        },

        resize: function (event) {
            var _this = event.data;
            if (_this.options.modal) {
                jQuery('.messi-modal')
                    .css({
                        width: jQuery(document).width(),
                        height: jQuery(document).height()
                    });
            }

            if (_this.options.center) {
                _this.center();
            } else if(_this.options.margin > 0) {
                _this.enforceMargin();
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

            jQuery(window).off('resize.MessiJS scroll.MessiJS', Messi.prototype.resize);

            if (this.modal) {
                this.modal.remove();
            }

            this.messi.remove();
        },

        // When the dialog is outside the viewport, move it back in.
        // options.viewport is the center point of the dialog
        enforceMargin: function () {
            if (!this.options.margin) { return; }

            var $window = jQuery(window);

            // Backward compatibility hack - remove in version 2.1
            var x = this.max(
                parseInt(this.options.viewport.left, 10),
                parseInt(this.options.position.left, 10)
            );
            var y = this.max(
                parseInt(this.options.viewport.top, 10),
                parseInt(this.options.position.top, 10)
            );

            // When the popup is too far on the right, move left
            if (x + this.messi.width() + this.options.margin > $window.width()) {
                x = $window.width() - this.options.margin - this.messi.width();
            }

            // When the popup is too far down, move up
            if (y + this.messi.height() + this.options.margin > $window.height()) {
                y = $window.height() - this.options.margin - this.messi.height();
            }

            // When the popup is too far to the left, move right
            if (x < this.options.margin) {
                x = this.options.margin;
            }

            // When the popup is too far up, move down
            if (y < this.options.margin) {
                y = this.options.margin;
            }

            this.messi.css({ left: x, top: y });
        },

        jqueryize: function() {
            return this.messi;
        },

        max: function (a, b) {
            if (a > b) { return a; }
            else { return b; }
        },

    };

    // Preserve backward compatibility
    window.Messi = Messi;

})();
// vim: expandtab shiftwidth=4 tabstop=4 softtabstop=4:

jQuery.extend(Messi, {

    alert: function (data, callback, options) {

        var buttons = [{
            id: 'ok',
            label: 'OK',
            val: 'OK'
        }];

        options = jQuery.extend(
            { closeButton: false, buttons: buttons, callback: function () {} },
            options,
            { show: true, unload: true, callback: callback }
        );

        return new Messi(data, options);

    },

    ask: function (data, callback, options) {

        var buttons = [
            { id: 'yes', label: 'Yes', val: 'Y', 'class': 'btn-success' },
            { id: 'no', label: 'No', val: 'N', 'class': 'btn-danger' }
        ];

        options = jQuery.extend(
            { closeButton: false, modal: true, buttons: buttons, callback: function () {} },
            options,
            { show: true, unload: true, callback: callback }
        );

        return new Messi(data, options);

    },

    img: function (src, options) {

        var img = new Image();

        jQuery(img).load(function () {

            var vp = {
                width: jQuery(window).width() - 50,
                height: jQuery(window).height() - 50
            };
            var ratio = (this.width > vp.width || this.height > vp.height) ?
                Math.min(vp.width / this.width, vp.height / this.height) :
                1;

            jQuery(img)
                .css({
                    width: this.width * ratio,
                    height: this.height * ratio
                });

            options = jQuery.extend(
                {
                    show:         true,
                    unload:       true,
                    closeButton:  true,
                    width:        this.width * ratio,
                    height:       this.height * ratio,
                    padding:      0
                },
                options
            );

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

        options = jQuery.extend(
            { show: true, unload: true, params: {} },
            options
        );

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
