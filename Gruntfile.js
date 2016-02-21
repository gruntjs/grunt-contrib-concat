/*
 * grunt-contrib-concat
 * http://gruntjs.com/
 *
 * Copyright (c) 2016 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    bannerProperty: 'AWESOME',
    concat: {
      default_options: {
        files: {
          'tmp/default_options': ['test/fixtures/file1', 'test/fixtures/file2']
        }
      },
      custom_options: {
        options: {
          separator: '\n;\n',
          banner: '/* THIS TEST IS <%= bannerProperty %> */\n',
          footer: 'dude'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/file1', 'test/fixtures/file2']
        }
      },
      handling_invalid_files: {
        src: ['test/fixtures/file1', 'invalid_file/should_warn/but_not_fail', 'test/fixtures/file2'],
        dest: 'tmp/handling_invalid_files',
        nonull: true
      },
      process_function: {
        options: {
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/file(\d)/, 'f$1');
          }
        },
        files: {
          'tmp/process_function': ['test/fixtures/file1', 'test/fixtures/file2']
        }
      },
      dir: {
        files: {
          // no pattern, just directory given, should not error
          'tmp/process_dir_path': ['test/fixtures']
        }
      },
      overwrite_one: {
        files: {
          'tmp/overwrite': ['test/fixtures/file1', 'test/fixtures/file2']
        }
      },
      overwrite_two: {
        files: {
          'tmp/overwrite': ['test/fixtures/banner2.js']
        }
      },
      sourcemap_options: {
        options: {
          banner: '// banner\n// line in banner\n',
          separator: '\n// line in separator\n',
          footer: '\n// line in footer\n// footer',
          sourceMap: true,
          sourceMapStyle: 'inline'
        },
        files: {
          'tmp/sourcemap_inline': [
            'test/fixtures/file0',
            'test/fixtures/file2'
          ]
        }
      },
      sourcemap2_options: {
        options: {
          sourceMap: true,
          sourceMapName: function(dest) {
            return path.join(
              path.dirname(dest),
              'maps',
              path.basename(dest) + '.map'
            );
          },
          sourceMapStyle: 'link'
        },
        files: {
          'tmp/sourcemap2_link': [
            'test/fixtures/mappedsource',
            'test/fixtures/file2'
          ]
        }
      },
      sourcemap3_options: {
        options: {
          sourceMap: true,
          sourceMapName: 'tmp/sourcemap3_embed_map.map'
        },
        files: {
          'tmp/sourcemap3_embed': [
            'test/fixtures/mappedsource_embed',
            'test/fixtures/file1',
            'test/fixtures/file2'
          ]
        }
      },
      sourcemap_js: {
        options: {
          banner: '/*\nJS Banner\n*/\n',
          sourceMap: true
        },
        files: {
          'tmp/sourcemap_js.js': [
            'test/fixtures/js1.js',
            'test/fixtures/js2.js'
          ]
        }
      },
      sourcemap_css: {
        options: {
          banner: '/*\nCSS Banner\n*/\n',
          sourceMap: true
        },
        files: {
          'tmp/sourcemap_css.css': [
            'test/fixtures/css1.css',
            'test/fixtures/css2.css'
          ]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'concat', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
