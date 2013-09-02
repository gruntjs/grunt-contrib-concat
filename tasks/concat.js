/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  // Internal lib.
  var comment = require('./lib/comment').init(grunt);

  grunt.registerMultiTask('concat', 'Concatenate files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed,
      banner: '',
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

      var realpath = function(filepath) {
        return f.cwd ? path.join(f.cwd, filepath) : filepath
      };

      // Concat banner + specified files + footer.
      var src = banner + f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        filepath = realpath(filepath);
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        filepath = realpath(filepath);
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

      // Write the destination file.
      var dest = realpath(f.dest);
      grunt.file.write(dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + dest + '" created.');
    });
  });

};
