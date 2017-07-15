context('Messi Extensions', () => {
    describe('Create a Messi.alert()', () => {
        var dialog = null;

        beforeEach(() => {
            dialog = Messi.alert('This is an alert with Messi.');
        });

        afterEach(() => {
            dialog.unload();
        });

        it.skip('should show a Messi alert', () => {
            expect(jQuery('.messi-content').text()).to.be.equal('This is an alert with Messi.');
        });

        it('should have an OK button', () => {
            expect(jQuery('.messi button').text()).to.equal('OK');
        });

        it.skip('should not have a titlebar by default', () => {
            expect(jQuery('.messi-titlebox').get(0)).to.be.undefined;
        });
    });

    describe('Create a Messi.ask() to launch a fast yes/no message', () => {
        var dialog = null;

        beforeEach(() => {
            dialog = Messi.ask(
                'This is a question with Messi. Do you like it?',
                value => { }
            );
        });

        afterEach(() => {
            dialog.unload();
        });

        //it('should have a callback');

        it('should have a yes button', () => {
            expect(jQuery('button[value="Yes"]').get(0)).to.be.defined;
        });

        it('should have a no button', () => {
            expect(jQuery('button[value="No"]').get(0)).to.be.defined;
        });

        it.skip('should have content', () => {
            expect(jQuery('.messi-content').text()).to.equal('This is a question with Messi. Do you like it?');
        });

        it.skip('but should not have a titlebar by default', () => {
            expect(jQuery('.messi-titlebox').get(0)).to.be.undefined;
        });
    });

    describe('Using Messi.img()', () => {
        it('will show an image', () => {
            Messi.img('https://avatars2.githubusercontent.com/u/70142?s=140');
            expect(jQuery('.messi').get(0)).to.be.defined;
            expect(jQuery('.messi img').get(0)).to.be.defined;
            jQuery('.messi').unload();
        });

        //it('will error loading a non-existant image', () => {
            //Messi.img('http://www.example.com/image.gif');
            //expect(jQuery('.messi').get(0)).to.be.defined;
            //expect(jQuery('.messi img').get(0)).to.be.undefined;
        //});
    });

    describe('Using Messi.load() will', () => {
        // TODO convert this to use Sinon.js
        it.skip('load content into Messi using Ajax', () => {
            Messi.load('http://google.com/', {});
            jQuery('.messi').unload();
        });

        // TODO convert this to use Sinon.js
        it.skip('fail to load content into Messi using Ajax', () => {
            Messi.load('http://messijs.github.io/', {});
            jQuery('.messi').unload();
        });

        it('Use Messi.load() to show an ajax response');
    });


});
