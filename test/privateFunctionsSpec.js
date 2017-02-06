// NOTE: Testing private functions is usually considered bad
// practice but I'm trying isolate what is wrong with nudge().

describe('Private function max', () => {
    it('should show 5 is greater than 3', () => {
        expect(Messi.prototype.max(5,3)).to.be.equal(5);
    });

    it('should show 3 is less than 7', () => {
        expect(Messi.prototype.max(3,7)).to.be.equal(7);
    });

    it('should show 3 is greater than -7', () => {
        expect(Messi.prototype.max(3,-7)).to.be.equal(3);
    });
});
