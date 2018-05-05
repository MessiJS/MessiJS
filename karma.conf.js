module.exports = function(config) {

    config.set({
        browsers: ['PhantomJS'],
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
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-mocha-reporter'
        ],
        preprocessors: {'src/*.js': ['coverage']},
        reporters: ['mocha',/* 'osx'*/, 'coverage'],
        singleRun: true
    });

};
