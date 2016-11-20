// ==== CONFIGURATION ==== //

// Project paths
var project = 'uwc-website', // The directory name for the theme.
  src = './src/', // The raw material of the theme: custom scripts, SCSS source files, PHP files, images, etc.; do not delete this folder!
  build = './' + project + '/', // A temporary directory containing a development version of your theme; delete it anytime.
  dist = './dist/', // The distribution package that you'll be uploading to your server; delete it anytime.
  bower = './bower_components/', // Bower packages
  modules = './node_modules/' // Npm packages
;

// Project settings
module.exports = {

  browsersync: {
    files: [ build + '/**', '!' + build + '/**.map' ], // Exclude map files.
    port: 5000, // Port number for the live version of the site; default: 3000.
    proxy: 'http://nc-website/', // We need to use a proxy instead of the built-in server because WordPress has to do some server-side rendering for the theme to work.
    notify: false, // In-line notifications (the blocks of text saying whether you are connected to the BrowserSync server or not).
    ui: false, // Set to false if you don't need the browsersync UI.
    open: false, // Set to false if you don't like the browser window opening automatically.
    watchOptions: {
      debounceDelay: 2000 // This introduces a small delay when watching for file change events to avoid triggering too many reloads.
    }
  },

  watch: { // What to watch before triggering each specified task; if files matching the patterns below change it will trigger BrowserSync or Livereload.
    src: {
      styles: src + 'scss/**/*.scss',
      scripts: src + 'js/**/*.js', // You might also want to watch certain dependency trees but that's up to you.
      images: src + '**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      theme: src + '**/*.php'
    }
  },

  images: {
    build: { // Copies images from `src` to `build`; does not optimize.
      src: src + '**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)',
      dest: build
    },
    dist: {
      src: [ dist + '**/*(*.png|*.jpg|*.jpeg|*.gif|*.svg)', '!' + dist + 'screenshot.png' ], // The source is actually `dist` since we are minifying images in place.
      imagemin: {
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
      },
      dest: dist
    }
  },

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
    }
  },

  theme: {
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
    }
  },

  utils: {
    clean: [ build + '**/.DS_Store' ], // A glob pattern matching junk files to clean out of `build`; feel free to add to this array.
    wipe: [ dist ], // Clean this out before creating a new distribution copy.
    dist: {
      src: [ build + '**/*', '!' + build + '**/*.map' ],
      dest: dist
    },
    dependencies: { // Copies dependencies from `bower_components` to `src/scss` and renames them to allow for them to be imported as a Sass file.
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
    }
  }
};
