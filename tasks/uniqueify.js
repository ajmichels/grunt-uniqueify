/*
 * grunt-uniqueify
 * https://github.com/ajmichels/grunt-uniqueify
 *
 * Copyright (c) 2014 AJ Michels
 * Licensed under the MIT license.
 *
 * Thanks to Sebastiaan Deckers (https://github.com/cbas/grunt-rev)
 *
 */

'use strict';

var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

module.exports = function(grunt) {

    var fileHash = function(filepath, algorithm) {
        var hash = crypto.createHash(algorithm);
        grunt.log.verbose.write('Hashing ' + filepath + '...');
        hash.update(grunt.file.read(filepath));
        return hash.digest('hex');
    };

    var textReplace = function(src, find, replace, filePath) {
        var newText = src.replace(find, replace);
        if (newText != src) {
            grunt.log.write(filePath + ' : ' + find + ' ').ok(replace);
        }
        return newText;
    };

    grunt.registerMultiTask('uniqueify', 'Updated file names and replace instances of the old name with the new name.', function(){
        var options = this.options({
            algorithm: 'md5',
            length: 8
        });

        // Rename the file
        grunt.event.on('uniqueify.rename', function(oldFile, newFile){
            fs.renameSync(oldFile, newFile);
            grunt.log.write(oldFile + ' ').ok(newFile);
        });

        // Replace instances of filename in code
        grunt.event.on('uniqueify.rename', function(oldFile, newFile){
            if (!options.replaceSrc) {
                grunt.log.warn('No src replacement paths (options.replaceSrc) defined in options.');
            }
            else {
                var find = path.basename(oldFile);
                var replace = path.basename(newFile);
                var targets = grunt.file.expand(options.replaceSrc);

                targets.forEach(function(filePath){
                    grunt.file.copy(filePath, filePath, {
                        process: function(text){
                            return textReplace(text, find, replace, filePath);
                        }
                    });
                });
            }

        });

        this.files.forEach(function(filePair){
            var cwd = filePair.orig.cwd;

            filePair.src.forEach(function(filePath) {
                var root = path.resolve(path.dirname('.'));
                var hash = fileHash(filePath, options.algorithm);
                var prefix = hash.slice(0, options.length);
                var renamed = [prefix, path.basename(filePath)].join('.');
                var outPath = path.resolve(path.dirname(filePath), renamed);

                outPath = outPath.replace(root + '/', '');

                grunt.event.emit('uniqueify.rename', filePath, outPath);

            });

        });

    });

};
