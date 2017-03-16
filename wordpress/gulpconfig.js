/* jshint -W117 */
/* jshint -W098 */
/* jshint -W070 */


// ==== GULP CONFIGURATION ==== //

// 1. Variables
// 2. BrowserSync
// 3. Watch
// 4. Update
// 5. Clean
// 6. Styles
// 7. Scripts
// 8. Images
// 9. WordPress


// 1. Variables //

var pkg  = require('./package.json'), // Allows access to the project metadata from the package.json file.
  project = pkg.name, // The name of the project, pulled from the package.json.
  src     = './src/', // The raw material of the theme: custom scripts, PHP source files, images, etc.; do not delete this folder!
  build = './' + project + '/', // A temporary directory containing a development version of your theme; delete it anytime.
  dist    = './dist/', // The distribution package that you'll be uploading to your server; delete it anytime.
  assets  = './assets/', // A staging area for assets that require processing before landing in the source folder (example: icons before being added to a sprite sheet).
  bower   = './bower_components/', // Bower packages.
  modules = './node_modules/' // NPM packages.
;


module.exports = {


  // 2. BrowserSync //

  browsersync: {
    files: [ build + '/**', '!' + build + '/**.map' ], // Exclude map files.
    port: 5000, // Port number for the live version of the site; default: 3000.
    proxy: 'http://local.' + project + '/', // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work.
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not).
    ui: false, // Set to false if you don't need the browsersync UI.
    open: false, // Set to false if you don't like the browser window opening automatically.
    reloadDelay: 1000, // Time, in milliseconds, to wait before reloading/injecting
    watchOptions: {
      debounceDelay: 4000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads.
    }
  },


  // 3. Watch //

  watch: { // What to watch before triggering each specified task; if files matching the patterns below change it will trigger BrowserSync or Livereload.
    src: {
      styles: src + 'scss/**/*.scss',
      scripts: src + 'js/**/*.js', // You might also want to watch certain dependency trees but that's up to you.
      images: src + '**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      theme: src + '**/*.php'
    }
  },


  // 4. Update  //

  update: {
    // Copies dependencies from package managers to `_scss` and renames them to allow for them to be imported as a Sass file.
    src: [
      bower + 'normalize-css/normalize.css',
      bower + 'slick-lightbox/dist/slick-lightbox.css',
      bower + 'slick-carousel/slick/slick.css',
      bower + 'slick-carousel/slick/slick-theme.css'
    ],
    dest: src + 'scss/deps',
    rename: {
      prefix: '_',
      extname: '.scss'
    }
  },


  // 5. Clean //

  clean: {
    tidy: [ build + '**/.DS_Store' ], // A glob pattern matching junk files to clean out of `build`; feel free to add to this array.
    wipe: [ dist ], // Clean this out before creating a new distribution copy.
  },


  // 6. Styles //

  styles: {
    build: {
      src: src + 'scss/**/*.scss',
      dest: build
    },
    compiler: 'libsass', // Choose a Sass compiler: 'libsass' or 'rubysass'.
    cssnano: {
      autoprefixer: {
        add: true,
        browsers: [ '> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4' ] // This tool is magic and you should use it in all your projects :).
      }
    },
    libsass: { // Requires the libsass implementation of Sass (included in this package).
      includePaths: [ './src/scss', bower, modules ], // Adds Bower and npm directories to the load path so you can @import directly.
      precision: 6,
      onError: function( err ) {
        return console.log( err );
      }
    },
    metadata: {
      src: build + 'style.css',
      dest: build
    },
  },


  // 7. Scripts //

  scripts: {
    bundles: { // Bundles are defined by a name and an array of chunks (below) to concatenate; warning: this method offers no dependency management!
      scripts: [ 'accessibility', 'navigation', 'lightbox', 'core', 'googleMaps' ],
      html5: [ 'ie' ],
      customizer: [ 'customizer' ]
    },
    chunks: { // Chunks are arrays of paths or globs matching a set of source files; this way you can organize a bunch of scripts that go together into pieces that can then be bundled (above).
      // The core chunk is loaded no matter what; put essential scripts that you want loaded by your theme in here.
      core: [
        src + 'js/scripts.js'
      ],
      accessibility: [
        src + 'js/skip-link-focus-fix.js'
      ],
      navigation: [
        bower + 'responsive-nav/responsive-nav.js',
        bower + 'headroom.js/dist/headroom.js',
        bower + 'smooth-scroll/dist/js/smooth-scroll.js'
      ],
      lightbox: [
        bower + 'slick-carousel/slick/slick.min.js',
        bower + 'slick-lightbox/dist/slick-lightbox.min.js'
      ],
      ie: [
        bower + 'html5shiv/dist/html5shiv.js'
      ],
      customizer: [
        src + 'js/customizer.js'
      ],
      googleMaps: [
        src + 'js/google-maps.js'
      ]
    },
    dest: build + 'js/', // Where the scripts end up in your theme.
    lint: {
      src: [ src + 'js/**/*.js' ] // Linting checks the quality of the code; we only lint custom scripts, not those under the various modules, so we're relying on the original authors to ship quality code.
    },
    minify: {
      src: build + 'js/**/*.js',
      uglify: {}, // Default options.
      dest: build + 'js/'
    }
  },


  // 8. Images //

  images: {
    copy: {
      src: src + '**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      dest: build
    },
    resize: {
      src: build + '*{.png,jpg,jpeg}',
      responsive: {
        'screenshot.*': [{
          width: 1200,
          height: 900,
          withoutEnlargement: false,
          rename: {
            extname: '.png',
          },
        }],
      },
      options: {
        errorOnUnusedImage: false,
        silent: true
      },
      dest: build,
    },
  },


  // 9. WordPress //

  wordpress: {
    lang: {
      src: src + 'languages/**/*', // Glob pattern matching any language files you'd like to copy over; we've broken this out in case you want to automate language-related functions.
      languages: src + 'languages/',
      domain: project,
      dest: build + 'languages/'
    },
    php: {
      src: [ src + '/**/*.php', ! src + '/vendor/**/*.*' ],
      dest: build,
      bin: 'phpcbf',
      standard: 'WordPress-Core',
      warningSeverity: '0'
    },
    fonts: {
      src: src + 'fonts/*', // This simply copies the custom font files over.
      dest: build + 'fonts/'
    },
    readme: {
      src: src + 'readme.*', // This simply copies the readme file over.
      dest: build
    },
    acf: {
      src: src + 'acf-json/**/*',
      dest: build + 'acf-json/'
    },
    dist: {
      src: [ build + '**/*', '!' + build + '**/*.map' ],
      dest: dist
    },
  },
};
