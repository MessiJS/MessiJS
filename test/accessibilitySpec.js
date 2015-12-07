/**
 * All tests related to Accessibility/ARIA
 */
describe('MessiJS will be accessible friendly by', function() {
    // var dialog = null;

    beforeEach(function() {
        dialog = new Messi('This is Messi.', {
            ariaPageContent: 'body > div',
            title: 'Accessible MessiJS',
            buttons: [
                {id: 0, label: 'Yes', val: 'Y', 'class': 'btn-success'},
                {id: 1, label: 'No', val: 'N', 'class': 'btn-danger'}
            ]
        });
    });

    afterEach(function() {
        dialog.unload();
    });

    it('using default attributes', function() {
        // create a new 'default' dialog
        dialog.unload();
        dialog = new Messi('This is Messi.', { ariaPageContent: false });
        expect(dialog.messi.find('div').attr('aria-hidden')).to.equal('true');
    });

    it('adding ARIA attributes', function() {
        // aria-hidden attribute on dialog should be false
        expect(dialog.messi.attr('aria-hidden')).to.equal('false');
        // main content aria-hidden attribute should be true
        expect($(dialog.options.ariaPageContent).attr('aria-hidden')).to.equal('true');
    });

    it('giving keyboard focus to the first focusable item'/*, function() {
        expect($(dialog.focusableElementsString, dialog.messi).first().is(':focus')).to.be.true;
    }*/);

    it('not allowing the content behind to be clicked on'/*, function() {
        // expect(jQuery('.messi-content').text()).to.be.equal('This is an alert with Messi.');
    }*/);

    describe('trapping the keyboard focus so', function() {
        it('tabbing from the last focusable item should move to the first focusable item'/*, function() {
            expect($(dialog.focusableElementsString, dialog.messi).first().is(':focus')).to.be.true;
            // expect(jQuery('.messi-content').text()).to.be.equal('This is an alert with Messi.');
        }*/);

        it('shift-tabbing from the first focusable item should move to the last focusable item'/*, function() {
            // expect(jQuery('.messi-content').text()).to.be.equal('This is an alert with Messi.');
        }*/);
    });
});
