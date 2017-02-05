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
