/*
 * grunt-uniqueify
 * https://github.com/ajmichels/grunt-uniqueify
 *
 * Copyright (c) 2014 AJ Michels
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
            ],
        },
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint']);

};
