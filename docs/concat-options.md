# Options

## separator
Type: `String`  
Default: `grunt.util.linefeed`

Concatenated files will be joined on this string. If you're post-processing concatenated JavaScript files with a minifier, you may need to use a semicolon `';\n'` as the separator.

## banner
Type: `String`  
Default: `''`

This string will be prepended to the beginning of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

## footer
Type: `String`  
Default: `''`

This string will be appended to the end of the concatenated output. It is processed using [grunt.template.process][], using the default options.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

## stripBanners
Type: `Boolean` `Object`  
Default: `false`

Strip JavaScript banner comments from source files.

* `false` - No comments are stripped.
* `true` - `/* ... */` block comments are stripped, but _NOT_ `/*! ... */` comments.
* `options` object:
  * By default, behaves as if `true` were specified.
  * `block` - If true, _all_ block comments are stripped.
  * `line` - If true, any contiguous _leading_ `//` line comments are stripped.

## process
Type: `Boolean` `Object` `Function`  
Default: `false`

Process source files before concatenating, either as [templates][] or with a custom function.

* `false` - No processing will occur.
* `true` - Process source files using [grunt.template.process][] defaults.
* `data` object - Process source files using [grunt.template.process][], using the specified options.
* `function(src, filepath)` - Process source files using the given function, called once for each file. The returned value will be used as source code.

_(Default processing options are explained in the [grunt.template.process][] documentation)_

  [templates]: https://github.com/gruntjs/grunt-docs/blob/master/grunt.template.md
  [grunt.template.process]: https://github.com/gruntjs/grunt-docs/blob/master/grunt.template.md#grunttemplateprocess

## sourceMap
Type: `Boolean`  
Default: `false`

Set to true to create a source map. The source map will be created alongside the destination file, and share the same file name with the `.map` extension appended to it.

## sourceMapName
Type: `String` `Function`  
Default: `undefined`

To customize the name or location of the generated source map, pass a string to indicate where to write the source map to. If a function is provided, the concat destination is passed as the argument and the return value will be used as the file name.

## sourceMapStyle
Type: `String`  
Default: `embed`

Determines the type of source map that is generated. The default value, `embed`, places the content of the sources directly into the map. `link` will reference the original sources in the map as links. `inline` will store the entire map as a data URI in the destination file.
