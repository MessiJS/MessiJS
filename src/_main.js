(function () {
    'use strict';

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
                close.bind('click', function () {
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
                var btnbox = jQuery('<div>', {'class':'messi-btnbox'});
                
                if (_this.options.buttonsAlign === 'center') {
                    btnbox.css('width', parseInt(100/_this.options.buttons.length, 10) + '%');
                } else if (_this.options.buttonsAlign === 'left') {
                    btnbox.css('padding-left', '10px');
                } else {
                    btnbox.css({'padding-right': '10px', 'float': 'right'});
                }
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
                close.bind('click', function () {
                    _this.hide();
                });

                jQuery('.messi-content', this.messi)
                    .prepend(close);

            }

        }

        // Activate the modal screen
        if (_this.options.modal) {
            _this.modal = jQuery('<div class="messi-modal" tabindex="-1"></div>')
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

        // Control the resizing of the display
        jQuery(window).bind('resize scroll', function () {
            _this.resize();
        });

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
            ariaPageContent: null,                                // selector of the main page content for maximum accessibility
            autoclose: null,                                    // autoclose message after 'x' miliseconds, i.e: 5000
            buttons: [],                                        // array of buttons, i.e: [{id: 'ok', label: 'OK', val: 'OK'}]
            buttonsAlign: 'center',                             // buttons alignment: center, left, right
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
        template: '<div class="messi"><div class="messi-box" role="dialog" aria-hidden="true" aria-labelledby="messiTitle"><div class="messi-wrapper"><div class="messi-titlebox"><h1 class="messi-title" id="messiTitle"></h1></div><div class="messi-content"></div><div class="messi-footbox"><div class="messi-actions"></div></div></div></div></div>',
        content: '<div></div>',
        visible: false,
        focusableElementsString: 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',

        trapTabKey: function(obj,evt) {

          // if tab or shift-tab pressed
          if ( evt.which === 9 ) {

            // get list of all children elements in given object
            var o = obj.find('*');

            // get list of focusable items
            var focusableItems;
            focusableItems = o.filter(this.focusableElementsString).filter(':visible');

            // get currently focused item
            var focusedItem;
            focusedItem = jQuery(':focus');

            // get the number of focusable items
            var numberOfFocusableItems;
            numberOfFocusableItems = focusableItems.length;

            // get the index of the currently focused item
            var focusedItemIndex;
            focusedItemIndex = focusableItems.index(focusedItem);

            if (evt.shiftKey) {
              //back tab
              // if focused on first item and user preses back-tab, go to the last focusable item
              if(focusedItemIndex===0){
                focusableItems.get(numberOfFocusableItems-1).focus();
                evt.preventDefault();
              }

            } else {
              //forward tab
              // if focused on the last item and user preses tab, go to the first focusable item
              if(focusedItemIndex===numberOfFocusableItems-1){
                focusableItems.get(0).focus();
                evt.preventDefault();
              }
            }
          }
        },

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
            
            // accessibility taken from: http://accessibility.oit.ncsu.edu/blog/2013/09/13/the-incredible-accessible-modal-dialog/
            // save current focus
            this.focusedElementBeforeModal = jQuery(':focus');

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
            
            if (this.options.ariaPageContent) {
                jQuery(this.options.ariaPageContent).attr('aria-hidden', 'true');
                jQuery(this.messi).attr('aria-hidden', 'false');
            }

            this.messi.show();
            
            var _this = this;
            this.messi.off('keydown')
                    .on('keydown', function(event){_this.trapTabKey($(this),event);});
            
            // get list of all children elements in given object
            var o = this.messi.find('*');

            // set focus to first focusable item
            var focusableItems;
            focusableItems = o.filter(this.focusableElementsString).filter(':visible').first().focus();


            // Get the center of the screen if the center option is on
            if (this.options.center) {
                this.center();
            } else {
                this.enforceMargin();
            }

            // Cancel the scroll
            //document.documentElement.style.overflow = "hidden";

            this.visible = true;

        },

        hide: function () {

            if (!this.visible) { return; }
            var _this = this;
            
            // set focus back to element that had it before the modal was opened
            this.focusedElementBeforeModal.focus();
            
            if (this.options.ariaPageContent) {
                jQuery(this.options.ariaPageContent).attr('aria-hidden', 'false');
                jQuery(this.messi).attr('aria-hidden', 'true');
            }

            if (this.options.animate) {
                this.messi.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    _this.visible = false;
                    if (_this.options.unload) {
                        _this.unload();
                    }
                });

                this.messi.removeClass(this.options.animate.open).addClass(this.options.animate.close);
            } else {
                this.messi.animate({
                    opacity: 0
                }, 300, function () {
                    if (_this.options.modal) {
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
            }

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
                this.center();
            } else if(this.options.margin > 0) {
                this.enforceMargin();
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
                .unbind('resize scroll');

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
