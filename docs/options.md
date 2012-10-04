### options.separator
Type: `String`
Default value: linefeed

Concatenated files will be joined on this string.

### options.banner
Type: `String`
Default value: empty string

This string will be prepended to the beginning of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

### options.stripBanners
Type: `Boolean`, `Object`
Default value: `false`

Strip JavaScript banner comments from source files.

* `false` - No comments are stripped.
* `true` - `/* ... */` block comments are stripped, but _NOT_ `/*! ... */` comments.
* `options` object:
  * By default, behaves as if `true` were specified.
  * `options.block` - If true, _all_ block comments are stripped.
  * `options.line` - If true, any contiguous _leading_ `//` line comments are stripped.

### options.process
Type: `Boolean`, `Object`
Default value: `false`

Process source files as [templates][] before concatenating.

* `false` - No processing will occur.
* `true` - Process source files using [grunt.template.process][] defaults.
* `options` object - Process source files using [grunt.template.process][], using the specified options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

  [templates]: https://github.com/gruntjs/grunt/blob/devel/docs/api_template.md
  [grunt.template.process]: https://github.com/gruntjs/grunt/blob/devel/docs/api_template.md#grunttemplateprocess
