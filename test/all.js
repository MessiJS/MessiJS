var expect = chai.expect;

beforeEach(function(done) {
    setTimeout(function() {
        $('container').width(800).height(600);
        //$(document).width(800).height(600);
        done();
    }, 25);
});

describe('Creating a simple Messi window', function() {

    it('should be ready', function() {
        expect($.Messi).to.be.a('function');
    });

    it('should open and close', function() {
        expect($('.messi:visible').get(0)).to.be.undefined;
        var dialog = new $.Messi('my message');
        expect($('.messi:visible').get(0)).to.be.ok;
        dialog.unload();
        expect($('.messi:visible').get(0)).to.be.undefined;
    });

    it('should show "my message"', function() {
        var dialog = new $.Messi('my message');
        expect($('.messi-content').text()).to.be.equal('my message');
        dialog.unload();
    });

    it('should toggle the dialog', function() {
        var dialog = new $.Messi('my message');
        expect($('.messi:visible', dialog).get(0)).to.be.defined;
        dialog.toggle();
        expect($('.messi:visible', dialog).get(0)).to.be.undefined;
        dialog.toggle();
        expect($('.messi:visible', dialog).get(0)).to.be.defined;
        dialog.unload();
    });

    it('should remain open on show()', function() {
        var dialog = new $.Messi('my message');
        expect($('.messi:visible', dialog).get(0)).to.be.defined;
        expect(dialog.visible).to.be.ok;
        dialog.show();
        expect($('.messi:visible', dialog).get(0)).to.be.defined;
        expect(dialog.visible).to.be.ok;
        dialog.unload();
    });

    it('should remain hidden on hide()', function(done) {
        var dialog = new $.Messi('my message');
        dialog.hide();
        setTimeout(function() {
            expect($('.messi:visible', dialog).get(0)).to.be.undefined;
            dialog.hide();
            expect($('.messi:visible', dialog).get(0)).to.be.defined;
            dialog.unload();
            done();
        }, 100);
    });

    it('should have a close button', function() {
        var dialog = new $.Messi('my message');
        expect($('.messi-closebtn').get(0)).to.be.defined;
        dialog.unload();
    });

    it('should close when we click the button', function(done) {
        var dialog = new $.Messi('my message');
        $('.messi-closebtn').click();
        setTimeout(function() {
            expect($('.messi:visible', dialog).get(0)).to.be.undefined;
            done();
        }, 600);
    });

    it('should close automatically when autoclose is enabled', function(done) {
        var dialog = new $.Messi('my message', {autoclose: 1000});
        expect($('.messi:visible', dialog).get(0)).to.be.defined;

        setTimeout(function() {
            expect($('.messi:visible', dialog).get(0)).to.be.undefined;
            done();
        }, 1500);
    });

    it('should show a closebutton when option is enabled', function() {
        var dialog = new $.Messi('my message', {closeButton: true});
        expect($('.messi-closebtn').get(0)).to.be.defined;
        dialog.unload();
    });

    it('should not show a closebutton when option is disabled', function() {
        var dialog = new $.Messi('my message', {closeButton: false});
        expect($('.messi-closebtn').get(0)).to.be.undefined;
        dialog.unload();
    });

});

describe('Create a titled Messi window', function() {
    beforeEach(function() {
        dialog = new $.Messi('my message', {title: 'My title'});
    });

    afterEach(function() {
        dialog.unload();
    });

    it('should have a title', function() {
        expect($('.messi-title:visible').text()).to.equal('My title');
    });

    it('should have a visible close button', function() {
        expect($('.messi-closebtn').get(0)).to.defined;
        expect($('.messi-closebtn').css('opacity')).to.equal('1');
    });

    it('should close when we click the button', function(done) {
        var dialog = new $.Messi('my message');
        $('.messi-closebtn').click();
        setTimeout(function() {
            expect($('.messi:visible', dialog).get(0)).to.be.undefined;
            done();
        }, 600);
    });
});

describe('Create a modal Messi window', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = new $.Messi(
            'This is a message with Messi in modal view. Now you can\'t interact with other elements in the page until close this.',
            {title: 'Modal Window', modal: true}
        );
    });

    afterEach(function() {
        dialog.unload();
    });

    it('should have a title', function() {
        expect($('.messi-title:visible').text()).to.equal('Modal Window');
    });

    it('should open a modal background', function() {
        expect($('.messi-modal').get(0)).to.defined;
    });
});

describe('Create an absolutely positioned Messi window', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = new $.Messi(
            'This is a message with Messi in absolute position.',
            {
                center: false,
                width: '200px',
                viewport: {top: '8px', left: '8px'}
            }
        );
    });

    afterEach(function() {
        dialog.unload();
    });

    // TODO this was failing on PhantomJS - viewport
    it('should be positioned absolutely', function() {
        var position = $('.messi').position();
        expect(position.top).to.equal(8);
        expect(position.left).to.equal(8);
    });
});

describe('Create a Messi window with a custom buttons', function() {
    var dialog = null;

    beforeEach(function(done) {
        dialog = new $.Messi(
            'This is a message with Messi with custom buttons.',
            {title: 'Buttons', buttons: [{id: 0, label: 'Close', val: 'X'}]}
        );
        done();
    });

    afterEach(function() {
        dialog.unload();
    });

    it('should show my message', function() {
        expect($('.messi-content').text()).to.be.equal('This is a message with Messi with custom buttons.');
    });

    it('should not have an inline close button', function() {
        expect($('.messi-closebtn').get(0)).to.be.undefined;
    });

    it('should have a custom "Close" action button', function() {
        expect($('.messi-actions button').text()).to.equal('Close');
    });
});

describe('Message with custom buttons (yes/no/cancel)', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = new $.Messi(
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

    afterEach(function() {
        dialog.unload();
    });

    it('should have a yes button', function() {
        expect($('button[value="Yes"]').get(0)).to.be.defined;
    });

    it('should have a no button', function() {
        expect($('button[value="No"]').get(0)).to.be.defined;
    });

    it('should have a cancel button', function() {
        expect($('button[value="Cancel"]').get(0)).to.be.defined;
    });
});

describe('Message with custom buttons (yes/no) and style classes', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = new $.Messi(
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

    afterEach(function() {
        dialog.unload();
    });

    it('should have a yes button with class', function() {
        expect($('button.btn-success[value="Yes"]').get(0)).to.be.defined;
    });

    it('should have a no button with class', function() {
        expect($('button.btn-danger[value="No"]').get(0)).to.be.defined;
    });
});

describe('Window with success title', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = new $.Messi(
            'This is a message with Messi.',
            {
                title: 'Title',
                titleClass: 'success',
                buttons: [{id: 0, label: 'Close', val: 'X'}]
            }
        );
    });

    afterEach(function() {
        dialog.unload();
    });

    it('should have a titleClass of "success"', function() {
        expect($('.messi-titlebox.success').attr('class')).to.match(/success/);
    });
});

describe('Window with error title (animated)', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = new $.Messi(
            'This is a message with Messi.',
            {
                title: 'Title',
                titleClass: 'anim error',
                buttons: [{id: 0, label: 'Close', val: 'X'}]
            }
        );
    });

    afterEach(function() {
        dialog.unload();
    });

    it('titleClass should be "error"', function() {
        expect($('.messi-titlebox.error').text()).to.be.equal('Title');
    });

    it('titleClass should be animated', function() {
        expect($('.messi-titlebox.anim').text()).to.be.equal('Title');
    });
});

describe('Create a Messi.alert()', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = Messi.alert('This is an alert with Messi.');
    });

    afterEach(function() {
        dialog.unload();
    });

    it('should show a Messi alert', function() {
        expect($('.messi-content').text()).to.be.equal('This is an alert with Messi.');
    });

    it('should have an OK button', function() {
        expect($('.messi button').text()).to.equal('OK');
    });

    it('should not have a titlebar by default', function() {
        expect($('.messi-titlebox').get(0)).to.be.undefined;
    });
});

describe('Create a Messi.ask() to launch a fast yes/no message', function() {
    var dialog = null;

    beforeEach(function() {
        dialog = Messi.ask(
            'This is a question with Messi. Do you like it?',
            function(value) { }
        );
    });

    afterEach(function() {
        dialog.unload();
    });

    it('should have a callback');

    it('should have a yes button', function() {
        expect($('button[value="Yes"]').get(0)).to.be.defined;
    });

    it('should have a no button', function() {
        expect($('button[value="No"]').get(0)).to.be.defined;
    });

    it('should have content', function() {
        expect($('.messi-content').text()).to.equal('This is a question with Messi. Do you like it?');
    });

    it('but should not have a titlebar by default', function() {
        expect($('.messi-titlebox').get(0)).to.be.undefined;
    });
});

// TODO load
describe('Use Messi.load() to show an ajax response', function() {
    it('TBD: show an Ajax response');
});

describe('Using Messi.img()', function() {
    it('will show an image', function() {
        dialog = Messi.img('https://avatars2.githubusercontent.com/u/70142?s=140');
        expect(jQuery('.messi', dialog).get(0)).to.be.defined;
        expect(jQuery('.messi img', dialog).get(0)).to.be.defined;
    });

    it('will error loading a non-existant image', function() {
        dialog = Messi.img('https://avatars2.githubusercontent.com/u/70142?s=140');
        expect(jQuery('.messi', dialog).get(0)).to.be.defined;
        expect(jQuery('.messi img', dialog).get(0)).to.be.undefined;
    });
});

// TODO nudge
describe('Messi with nudge', function() {
    it('nudge() is not tested');
    it('max() is not tested');
    it('isNumber() is not tested');
});

describe('Code Coverage reveals that', function() {
    it('options.width is not tested');
    it('btnCallback is not tested');
    it('.messi-actions button:click is not tested');
    it('options.show is not tested');
    it('messi.parent().length > 0 is not tested');
    it('options.center is not tested');
    it('options.after is not tested');
    it('messi.animate with options.modal is not tested');
    it('messi.animate with options.unload not defined is not tested');
    it('resize with options.center is not tested');
});
