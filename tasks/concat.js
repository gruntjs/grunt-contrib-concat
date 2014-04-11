/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var comment = require('./lib/comment').init(grunt);
  var chalk = require('chalk');

  grunt.registerMultiTask('concat', 'Concatenate files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed,
      banner: '',
      footer: '',
      stripBanners: false,
      process: false,
      failOnMissing: false
    });

    // Normalize boolean options that accept options objects.
    if (options.stripBanners === true) { options.stripBanners = {}; }
    if (options.process === true) { options.process = {}; }

    // Process banner and footer.
    var banner = grunt.template.process(options.banner);
    var footer = grunt.template.process(options.footer);

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      var missing = false;
      // Concat banner + specified files + footer.
      var src = banner + f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          missing = true;
          if (options.failOnMissing) {
            grunt.warn('Source file "' + filepath + '" not found.', 6);
          } else {
            grunt.log.warn('Source file "' + filepath + '" not found.');
          }
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        var src = grunt.file.read(filepath);
        // Process files as templates if requested.
        if (typeof options.process === 'function') {
          src = options.process(src, filepath);
        } else if (options.process) {
          src = grunt.template.process(src, options.process);
        }
        // Strip banners if requested.
        if (options.stripBanners) {
          src = comment.stripBanner(src, options.stripBanners);
        }
        return src;
      }).join(options.separator) + footer;

      // Don't write it out if failOnMissing is true
      if (missing && options.failOnMissing) {
        return;
      }

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File ' + chalk.cyan(f.dest) + ' created.');
    });
  });

};
