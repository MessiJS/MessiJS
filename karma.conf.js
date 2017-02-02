module.exports = function(config) {
    config.set({
        browsers: ['Firefox'],
        coverageReporter: { type : 'lcov', dir : 'coverage/' },
        files: [
            'node_modules/mocha/mocha.js',
            'node_modules/chai/chai.js',
            'jquery.min.js',
            'src/_main.js',
            //'src/extensions.js',
            'test/_mainSpec.js',
            //'test/privateFunctionsSpec.js',
            //'test/extensionsSpec.js',
            //'test/todoSpec.js',
            'src/*.css'
        ],
        frameworks: ['mocha'],
        plugins: [
            'karma-coverage',
            'karma-firefox-launcher',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-notify-reporter'
        ],
        preprocessors: {'src/*.js': ['coverage']},
        reporters: ['mocha', 'notify', 'coverage'],
        singleRun: true
    });

};
