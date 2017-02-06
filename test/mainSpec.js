context('Main Function', () => {
    'use strict';

    describe('Creating a simple Messi window', () => {

        it('should be ready', () => {
            expect(Messi).to.be.a('function');
        });

        it('should open and close', done => {
            //expect(jQuery('.messi:visible').get(0)).to.be.undefined;
            dialog = new Messi('my message');
            expect(jQuery('.messi:visible', dialog.jqueryize()).get(0)).to.be.defined;
            dialog.unload();
            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog.jqueryize()).get(0)).to.be.undefined;
                done();
            }, 100);
        });

        it('should show "my message"', () => {
            dialog = new Messi('my message');
            expect(jQuery('.messi-content').text()).to.be.equal('my message');
            dialog.unload();
        });

        it('should not be visible if show = false', () => {
            dialog = new Messi('my message', {show: false});
            expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
        });

        it('should have a close button', () => {
            dialog = new Messi('my message');
            expect(jQuery('.messi-closebtn', dialog.jqueryize()).get(0)).to.be.defined;
            dialog.unload();
        });

        it('should close when we click the button', done => {
            dialog = new Messi('my message');
            jQuery('.messi-closebtn', dialog.jqueryize()).click();
            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
                done();
            }, 100);
        });

        it('should close automatically when autoclose is enabled', done => {
            dialog = new Messi('my message', {autoclose: 100 });
            expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;

            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
            }, 90);
            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
                done();
            }, 200);
        });

        it('should close automatically when autoclose is enabled', done => {
            dialog = new Messi(
                'my message',
                {
                    autoclose: 100,
                    callback: value => { console.log(value); }
                }
            );

            expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;

            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
            }, 90);
            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
                done();
            }, 200);
        });

        it('should show a closebutton when option is enabled', () => {
            dialog = new Messi('my message', {closeButton: true});
            expect(jQuery('.messi-closebtn', dialog.jqueryize()).get(0)).to.be.defined;
            dialog.unload();
        });

        it('should not show a closebutton when option is disabled', () => {
            dialog = new Messi('my message', {closeButton: false});
            expect(jQuery(dialog.jqueryize()).get(0)).to.be.defined;
            expect(jQuery('.messi-closebtn', dialog.jqueryize()).get(0)).to.be.undefined;
            dialog.unload();
        });

    });

    describe('Create a Messi window with advanced features', () => {

        it('and a callback', done => {
            dialog = new Messi(
                'This is a message with Messi with custom buttons.',
                {
                    title: 'Buttons',
                    buttons: [{id: 0, label: 'Close', val: 'X', 'class': 'cbClose'}],
                    callback: function(value) {
                        jQuery(document).triggerHandler('messi.cb');
                        return true;
                    }
                }
            );
            jQuery(document).bind('messi.cb', function(val) {
                setTimeout(() => {
                    expect(jQuery(dialog.jqueryize()).is(':visible')).to.be.false;
                    jQuery(document).unbind('messi.cb');
                    done();
                }, 800);
            });
            expect(jQuery('.messi-title:visible', dialog.jqueryize()).text()).to.equal('Buttons');
            expect(jQuery('button.cbClose', dialog.jqueryize()).get(0)).to.be.defined;
            jQuery('.cbClose', dialog.jqueryize()).click();
        });

        it('and a failing callback', done => {
            dialog = new Messi(
                'This is a message with Messi with custom buttons.',
                {
                    title: 'Buttons',
                    buttons: [{id: 0, label: 'Close', val: 'X', 'class': 'cbClose'}],
                    callback: function(value) {
                        jQuery(document).triggerHandler('messi.cb');
                        return false;
                    }
                }
            );
            jQuery(document).bind('messi.cb', function(val) {
                setTimeout(() => {
                    expect(jQuery(dialog.jqueryize()).is(':visible')).to.be.true;
                    dialog.unload();
                    done();
                }, 350);
            });
            expect(jQuery('.messi-title:visible', dialog.jqueryize()).text()).to.equal('Buttons');
            expect(jQuery('button.cbClose', dialog.jqueryize()).get(0)).to.be.defined;
            jQuery('.cbClose', dialog.jqueryize()).click();
        });
    });

    describe('Create a titled Messi window', () => {
        beforeEach(() => {
            dialog = new Messi('my message', {title: 'My title'});
        });

        afterEach(() => {
            dialog.unload();
        });

        it('should have a title', () => {
            expect(jQuery('.messi-title:visible', dialog.jqueryize()).text()).to.equal('My title');
        });

        it('should have a visible close button', () => {
            expect(jQuery('.messi-closebtn', dialog.jqueryize()).get(0)).to.defined;
            expect(jQuery('.messi-closebtn', dialog.jqueryize()).css('opacity')).to.equal('1');
        });

        it('should close when we click the button', done => {
            dialog = new Messi('my message');
            jQuery('.messi-closebtn', dialog.jqueryize()).click();
            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog.jqueryize()).get(0)).to.be.undefined;
                done();
            }, 100);
        });
    });

    describe('Create a modal Messi window', () => {
        dialog = null;

        beforeEach(() => {
            dialog = new Messi(
                'This is a message with Messi in modal view. Now you can\'t interact with other elements in the page until close this.',
                {title: 'Modal Window', modal: true}
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        it('should have a title', () => {
            expect(jQuery('.messi-title:visible', dialog.jqueryize()).text()).to.equal('Modal Window');
        });

        it('should open a modal background', () => {
            jQuery(window).trigger('resize.MessiJS');
            expect(jQuery('.messi-modal', dialog.jqueryize()).get(0)).to.be.defined;
        });
    });

    describe('Create an absolutely positioned Messi window', () => {
        it('should be positioned absolutely', () => {
            dialog = new Messi(
                'This is a message with Messi in absolute position.',
                {
                    animate:  false,
                    center:   false,
                    width:    '200px',
                    position: {top: '52px', left: '138px'}
                }
            );

            jQuery(window).trigger('resize.MessiJS');
            var position = dialog.jqueryize().position();
            expect(position).to.eql({top: 52, left: 138});
            dialog.unload();
        });

        it('should be positioned absolutely with viewport', () => {
            dialog = new Messi(
                'This is a message with Messi in absolute position.',
                {
                    animate:  false,
                    center:   false,
                    width:    '200px',
                    viewport: {top: '52px', left: '138px'}
                }
            );

            jQuery(window).trigger('resize.MessiJS');
            var position = dialog.jqueryize().position();
            expect(position).to.eql({top: 52, left: 138});
            dialog.unload();
        });

    });

    describe('Create a Messi window with a custom buttons', () => {
        dialog = null;

        beforeEach(() => {
            dialog = new Messi(
                'This is a message with Messi with custom buttons.',
                {title: 'Buttons', buttons: [{id: 0, label: 'Close', val: 'X'}]}
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        it('should show my message', () => {
            expect(jQuery('.messi-content', dialog.jqueryize()).text()).to.be.equal('This is a message with Messi with custom buttons.');
        });

        it('should not have an inline close button', () => {
            expect(jQuery('.messi-closebtn', dialog.jqueryize()).get(0)).to.be.undefined;
        });

        it('should have a custom "Close" action button', () => {
            expect(jQuery('.messi-actions button', dialog.jqueryize()).text()).to.equal('Close');
        });
    });

    describe('Message with custom buttons (yes/no/cancel)', () => {
        dialog = null;

        beforeEach(() => {
            dialog = new Messi(
                'This is a message with Messi with custom buttons.',
                {
                    title: 'Buttons',
                    buttons: [
                        {id: 0, label: 'Yes', val: 'Y'},
                        {id: 1, label: 'No', val: 'N'},
                        {id: 2, label: 'Cancel', val: 'C'}
                    ]
                }
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        it('should have a yes button', () => {
            expect(jQuery('button[value="Yes"]', dialog.jqueryize()).get(0)).to.be.defined;
        });

        it('should have a no button', () => {
            expect(jQuery('button[value="No"]', dialog.jqueryize()).get(0)).to.be.defined;
        });

        it('should have a cancel button', () => {
            expect(jQuery('button[value="Cancel"]', dialog.jqueryize()).get(0)).to.be.defined;
        });
    });

    describe('Message with custom buttons (yes/no) and style classes', () => {
        dialog = null;

        beforeEach(() => {
            dialog = new Messi(
                'This is a message with Messi with custom buttons.',
                {
                    title: 'Buttons',
                    buttons: [
                        {id: 0, label: 'Yes', val: 'Y', 'class': 'btn-success'},
                        {id: 1, label: 'No', val: 'N', 'class': 'btn-danger'}
                    ]
                }
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        it('should have a yes button with class', () => {
            expect(jQuery('button.btn-success[value="Yes"]', dialog.jqueryize()).get(0)).to.be.defined;
        });

        it('should have a no button with class', () => {
            expect(jQuery('button.btn-danger[value="No"]', dialog.jqueryize()).get(0)).to.be.defined;
        });
    });

    describe('Window with success title', () => {
        dialog = null;

        beforeEach(() => {
            dialog = new Messi(
                'This is a message with Messi.',
                {
                    title: 'Title',
                    titleClass: 'success',
                    buttons: [{id: 0, label: 'Close', val: 'X'}]
                }
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        it('should have a titleClass of "success"', () => {
            expect(jQuery('.messi-titlebox.success', dialog.jqueryize()).attr('class')).to.match(/success/);
        });
    });

    describe('Window with error title (animated)', () => {
        dialog = null;

        beforeEach(() => {
            dialog = new Messi(
                'This is a message with Messi.',
                {
                    title: 'Title',
                    titleClass: 'anim error',
                    buttons: [{id: 0, label: 'Close', val: 'X'}]
                }
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        it('titleClass should be "error"', () => {
            expect(jQuery('.messi-titlebox.error', dialog.jqueryize()).text()).to.be.equal('Title');
        });

        it('titleClass should be animated', () => {
            expect(jQuery('.messi-titlebox.anim', dialog.jqueryize()).text()).to.be.equal('Title');
        });
    });

    describe('Window with a margin', () => {
        it('when center is on', () => {
            jQuery(window).trigger('resize.MessiJS');
            dialog = new Messi('This is a message with Messi.', {
                title: 'Margin Center Test',
                center: true,
                margin: 15,
                position: { top: '10px', left: '10px' }
            });

            expect(dialog.jqueryize().position().top).to.not.equal(10);
            dialog.unload();
        });

        it('when margin is off', () => {
            dialog = new Messi('This is a message with Messi.', {
                title: 'Margin Off Test',
                animate:  false,
                center: false,
                margin: 0,
                position: { top: '10px', left: '10px' }
            });

            expect(dialog.jqueryize().position()).to.eql({top: 10, left: 10});
            dialog.unload();
        });

        it('when margin is on', () => {
            dialog = new Messi('This is a message with Messi.', {
                title: 'Margin On Test',
                center: false,
                margin: 15,
                position: { top: -15, left: -15 }
            });

            jQuery(window).trigger('resize.MessiJS');
            dialog.messi.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                expect(dialog.jqueryize().position()).to.eql({top: 15, left: 15});
                dialog.unload();
            });
        });

        it('when margin is on and too low', () => {
            dialog = new Messi('This is a message with Messi.', {
                title: 'Margin On Test',
                center: false,
                margin: 15,
                position: { top: 2900, left: 15 }
            });

            var newTop = window.innerHeight - 15 - dialog.jqueryize().height();

            dialog.messi.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                expect(dialog.jqueryize().position()).to.eql({top: newTop, left: 15});
                dialog.unload();
            });
        });

        it('when margin is on and too far right', () => {
            dialog = new Messi('This is a message with Messi.', {
                title: 'Margin On Test',
                center: false,
                margin: 15,
                position: { top: 15, left: 2900 },
                width: '300px'
            });

            var newLeft = window.innerWidth - 15 - dialog.jqueryize().width();

            dialog.messi.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
                expect(dialog.jqueryize().position()).to.eql({top: 15, left: newLeft});
                dialog.unload();
            });
        });
    });

    describe('Events are unbound on close', () => {
        it('when modal is closed, event are unbound', done => {
            dialog = new Messi('This is a message with Messi.', {
                title: 'Margin Center Test',
                center: true,
                margin: 15,
                position: { top: '10px', left: '10px' }
            });

            setTimeout(() => {
                var events = jQuery._data(window, 'events');

                // expect modal events to be bound
                expect(events).to.contain.keys('resize');
                expect(events.resize[0].type).to.equal('resize');
                expect(events.resize[0].namespace).to.equal('MessiJS');

                expect(events).to.contain.keys('scroll');
                expect(events.scroll[0].type).to.equal('scroll');
                expect(events.scroll[0].namespace).to.equal('MessiJS');

                dialog.unload();

                // expect modal events to be unbound
                expect(events).to.not.contain.keys('resize');
                expect(events).to.not.contain.keys('scroll');
                done();
            }, 50);

        });
    });
});
