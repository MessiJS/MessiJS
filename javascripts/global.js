$('.language-javascript code').each(function(index, el) {
    var $this = $(this);
    var js = $this.text()

    $('<a href="">RUN</a>')
        .insertBefore(this)
        .click(function() {
            eval(js); // bad practice but I control `js`
            return false;
        })
        .css('float', 'right');
});
