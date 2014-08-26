module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      files: {
        'build/<%= pkg.name %>.min.css': ['src/css/*']
      }
    },
    react: {
      convert: {
        files: [
          {
            expand: true,
            cwd: 'src/jsx/',
            src: ['*.jsx'],
            dest: 'src/js/',
            ext: '.js'
          }
        ]
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapName: 'build/<%= pkg.name %>.map'
      },
      files: {
        'build/<%= pkg.name %>.min.js': ['src/js/*']
      }
    },
    cachebreaker: {
      options: {
        match: ['flibbertigibbet.min.css', 'flibbertigibbet.min.js'],
      },
      files: {
        src: ['index.html']
      }
    },
    watch: {
      files: ['src/**/*'],
      tasks: ['default']
    }
  });

  // Load the plugins that provide the above tasks.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-cache-breaker');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default tasks.
  grunt.registerTask('default', ['cssmin', 'react:convert', 'uglify', 'cachebreaker']);
};