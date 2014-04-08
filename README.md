# grunt-uniqueify

> Rename files using a content hash then replace references to that file in source code.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-uniqueify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-uniqueify');
```

## The "uniqueify" task

### Overview
In your project's Gruntfile, add a section named `uniqueify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  uniqueify: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.replaceSrc
Type: `Array`
Default value: null

Locations that should be inspected for references to the files being renamed.

### Usage Examples

#### Default Options
In this example the JS and CSS files in the specified directories will be renamed.

```js
grunt.initConfig({
  uniqueify: {
    files: {
      src: ['src/testing/*.js', 'src/123/*.css'],
    },
  },
});
```

#### Custom Options
In this example the JS and CSS files in the specified directories will be renamed and any references to the original names in any .html files will be replaced with the new names.

```js
grunt.initConfig({
  uniqueify: {
    options: {
      replaceSrc: ['src/**/*.html']
    },
    files: {
      src: ['src/testing/*.js', 'src/123/*.css'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
