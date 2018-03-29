'use strict';

const grunt = require('grunt');
const comment = require('../tasks/lib/comment').init(grunt);

function getNormalizedFile(filepath) {
  return grunt.util.normalizelf(grunt.file.read(filepath));
}

exports.concat = {
  default_options: function(test) {
    test.expect(1);

    const actual = getNormalizedFile('tmp/default_options');
    const expected = getNormalizedFile('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    const actual = getNormalizedFile('tmp/custom_options');
    const expected = getNormalizedFile('test/expected/custom_options');
    test.equal(actual, expected, 'should utilize custom banner, footer and separator.');

    test.done();
  },
  handling_invalid_files: function(test) {
    test.expect(1);

    const actual = getNormalizedFile('tmp/handling_invalid_files');
    const expected = getNormalizedFile('test/expected/handling_invalid_files');
    test.equal(actual, expected, 'will have warned, but should not fail.');

    test.done();
  },
  strip_banner: function(test) {
    test.expect(10);

    let src = getNormalizedFile('test/fixtures/banner.js');
    test.equal(
      comment.stripBanner(src),
      grunt.util.normalizelf('// Comment\n\n/* Comment */\n'),
      'It should strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { block: true }),
      grunt.util.normalizelf('// Comment\n\n/* Comment */\n'),
      'It should strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { block: true, line: true }),
      grunt.util.normalizelf('// Comment\n\n/* Comment */\n'),
      'It should strip the top banner.'
    );

    src = getNormalizedFile('test/fixtures/banner2.js');
    test.equal(
      comment.stripBanner(src),
      grunt.util.normalizelf('\n/*! SAMPLE\n * BANNER */\n\n// Comment\n\n/* Comment */\n'),
      'It should not strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { block: true }),
      grunt.util.normalizelf('// Comment\n\n/* Comment */\n'),
      'It should strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { block: true, line: true }),
      grunt.util.normalizelf('// Comment\n\n/* Comment */\n'),
      'It should strip the top banner.'
    );

    src = getNormalizedFile('test/fixtures/banner3.js');
    test.equal(
      comment.stripBanner(src),
      grunt.util.normalizelf(
        '\n// This is\n// A sample\n// Banner\n\n// But this is not\n\n/* And neither\n * is this\n */\n'
      ),
      'It should not strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { block: true }),
      grunt.util.normalizelf(
        '\n// This is\n// A sample\n// Banner\n\n// But this is not\n\n/* And neither\n * is this\n */\n'
      ),
      'It should not strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { line: true }),
      grunt.util.normalizelf('// But this is not\n\n/* And neither\n * is this\n */\n'),
      'It should strip the top banner.'
    );
    test.equal(
      comment.stripBanner(src, { block: true, line: true }),
      grunt.util.normalizelf('// But this is not\n\n/* And neither\n * is this\n */\n'),
      'It should strip the top banner.'
    );
    test.done();
  },
  process_function: function(test) {
    test.expect(1);

    const actual = getNormalizedFile('tmp/process_function');
    const expected = getNormalizedFile('test/expected/process_function');
    test.equal(actual, expected, 'should have processed file content.');

    test.done();
  },
  process_dir_path: function(test) {
    test.expect(1);

    const actual = getNormalizedFile('tmp/process_dir_path');
    const expected = getNormalizedFile('test/expected/process_dir_path');
    test.equal(actual, expected, 'should have nothing.');

    test.done();
  },
  overwrite: function(test) {
    test.expect(1);

    const actual = getNormalizedFile('tmp/overwrite');
    const expected = getNormalizedFile('test/expected/overwrite');
    test.equal(actual, expected, 'should overwrite contents.');

    test.done();
  },
  sourcemap_options: function(test) {
    test.expect(5);

    let actual = getNormalizedFile('tmp/sourcemap_inline');
    let expected = getNormalizedFile('test/expected/sourcemap_inline');
    test.equal(actual, expected, 'should output the source with inlined map.');

    actual = getNormalizedFile('tmp/maps/sourcemap2_link.map');
    expected = getNormalizedFile('test/expected/sourcemap2_link.map');
    test.equal(actual, expected, 'should output the constructed map.');

    actual = getNormalizedFile('tmp/sourcemap3_embed_map.map');
    expected = getNormalizedFile('test/expected/sourcemap3_embed.map');
    test.equal(actual, expected, 'should output the constructed map.');

    actual = getNormalizedFile('tmp/sourcemap_js.js.map');
    expected = getNormalizedFile('test/expected/sourcemap_js.js.map');
    test.equal(actual, expected, 'should output the js map.');

    actual = getNormalizedFile('tmp/sourcemap_css.css.map');
    expected = getNormalizedFile('test/expected/sourcemap_css.css.map');
    test.equal(actual, expected, 'should output the css map.');

    test.done();
  }
};
