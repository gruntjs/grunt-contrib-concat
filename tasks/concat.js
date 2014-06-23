/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');

module.exports = function(grunt) {

  // Internal lib.
  var comment = require('./lib/comment').init(grunt);
  var chalk = require('chalk');

  grunt.registerMultiTask('concat', 'Concatenate files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed,
      banner: '',
      binary: false,
      footer: '',
      stripBanners: false,
      process: false
    });

    // Normalize boolean options that accept options objects.
    if (options.stripBanners === true) { options.stripBanners = {}; }
    if (options.process === true) { options.process = {}; }

    // Process banner and footer.
    var banner = grunt.template.process(options.banner);
    var footer = grunt.template.process(options.footer);

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var buffers = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        if (grunt.file.isDir(filepath)) {
          return;
        }
        // Read file source.
        if (options.binary) {
          var src = fs.readFileSync(filepath);
        }
        else {
          var src = grunt.file.read(filepath);
        }
        // Process files as templates if requested.
        if (typeof options.process === 'function') {
          src = options.process(src, filepath);
        } else if (!options.binary && options.process) {
          src = grunt.template.process(src, options.process);
        }
        // Strip banners if requested.
        if (!options.binary && options.stripBanners) {
          src = comment.stripBanner(src, options.stripBanners);
        }
        return src;
      });

      // Write the destination file.
      if (options.binary) {
        fs.writeFileSync(f.dest, Buffer.concat(buffers));
      }
      else {
        // Concat banner + specified files + footer.
        var output = banner + buffers.join(options.separator) + footer;
        grunt.file.write(f.dest, output);
      }

      // Print a success message.
      grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
    });
  });

};
