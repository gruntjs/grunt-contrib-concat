/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Internal lib.
  var comment = require('./lib/comment').init(grunt),
      path = require('path');

  grunt.registerMultiTask('concat', 'Concatenate files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: grunt.util.linefeed,
      banner: '',
      footer: '',
      stripBanners: false,
      process: false,
      includes: false
    });

    // Normalize boolean options that accept options objects.
    if (options.stripBanners === true) { options.stripBanners = {}; }
    if (options.process === true) { options.process = {}; }

    // Process footer.
    var footer = grunt.template.process(options.footer);

    // Iterate over all src-dest file pairs.
    this.files.forEach(function(f) {
      // Concat banner + specified files + footer.
      var includes = [],
      src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          includes.push(path.basename(filepath));
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
      }).join(options.separator);

      var banner = options.banner;

      // Write the destination file.
      grunt.file.write(f.dest, banner +
                               (options.includes ? '/*!\n * @includes '+includes.join('\n * @includes ')+ '\n */\n' : '') +
                               src +
                               footer);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
