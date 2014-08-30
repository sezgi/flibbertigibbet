module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Minify CSS into build folder.
    cssmin: {
      combine: {
        files: {
          'public/build/<%= pkg.name %>.min.css': ['public/css/*']
        }
      }
    },
    // Convert JSX to JS. 
    // Place JS in public folder so sourcemaps can read it.
    react: {
      convert: {
        files: [
          {
            expand: true,
            cwd: 'src/jsx/',
            src: ['*.jsx'],
            dest: 'public/js/',
            ext: '.js'
          }
        ]
      }
    },
    // Minify JS into build folder.
    uglify: {
      js: {
        options: {
          sourceMap: true,
          sourceMapName: 'public/build/<%= pkg.name %>.map'
        },
        files: {
          'public/build/<%= pkg.name %>.min.js': ['public/js/*']
        }
      }
    },
    // Any time minified files change, change cache string.
    cachebreaker: {
      bust: {
        options: {
          match: ['flibbertigibbet.min.css', 'flibbertigibbet.min.js'],
        },
        files: {
          src: ['views/index.html']
        }
      }
    },
    // Any time JSX or CSS files change, run build tasks.
    watch: {
      files: ['src/jsx/*', 'public/css/*'],
      tasks: ['default']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks.
  grunt.registerTask('default', ['cssmin:combine', 'react:convert', 'uglify:js', 'cachebreaker:bust']);
};