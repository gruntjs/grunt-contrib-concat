/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function(/*grunt*/) {
  var exports = {};

  // Return the given source code with any leading banner comment stripped.
  exports.stripBanner = function(src, options) {
      if (!options) { options = {}; }
      var m = [];
      if (options.line) {
          // Strip // ... leading banners.
          m.push('(/{2,}[\\s\\S].*)');
      }
      if (options.block) {
          // Strips all /* ... */ block comment banners.
          m.push('(\/+\\*+[\\s\\S]*?\\*\\/+)');
      } else {
          // Strips only /* ... */ block comment banners, excluding /*! ... */.
          m.push('(\/+\\*+[^!][\\s\\S]*?\\*\\/+)');

      }
      var re = new RegExp('\s*(' + m.join('|') + ')\s*', 'g');
      src = src.replace(re, '');
      src = src.replace(/\s{2,}(\r|\n|\s){2,}$/gm, '');
      return src;
  };

  return exports;
};