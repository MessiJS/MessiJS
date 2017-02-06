context('Main Prototype', () => {
    'use strict';
    let dialog = null;

    it('should toggle the dialog', done => {
        dialog = new Messi('my message');
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
        dialog.toggle();
        setTimeout(() => {
            expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
            dialog.toggle();
            setTimeout(() => {
                expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
                dialog.unload();
                done();
            }, 100);
        }, 100);
    });

    it('should remain open on show()', () => {
        dialog = new Messi('my message');
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
        expect(dialog.visible).to.be.ok;
        dialog.show();
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
        expect(dialog.visible).to.be.ok;
        dialog.unload();
    });

    it('should remain hidden on hide()', () => {
        dialog = new Messi('my message');
        dialog.hide();
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
        dialog.hide();
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
        dialog.unload();
    });

    it('should remain hidden on hide(), with modal', () => {
        dialog = new Messi('my message', {modal: true});
        dialog.hide();
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.undefined;
        dialog.hide();
        expect(jQuery('.messi:visible', dialog).get(0)).to.be.defined;
        dialog.unload();
    });

});
