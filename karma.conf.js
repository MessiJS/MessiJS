module.exports = function(config) {
    config.set({
        browsers: ['Firefox'],
        coverageReporter: { type : 'lcov', dir : 'coverage/' },
        files: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'jquery.min.js',
            'src/Messi.*.js',
            'src/extensions.js',
            'test/_init.js',
            'test/*Spec.js',
            'src/*.css'
        ],
        frameworks: ['mocha', 'es6-shim'],
        plugins: [
            'karma-es6-shim',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jsdom-launcher',
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-notify-reporter'
        ],
        preprocessors: {'src/*.js': ['coverage']},
        reporters: ['mocha', 'notify', 'coverage'],
        singleRun: true
    });

};
