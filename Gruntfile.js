module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      combine: {
        files: {
          'dest/<%= pkg.name %>.min.css': ['src/css/*']
        }
      }
    },
    uglify: {
      js: {
        options: {
          sourceMap: true,
          sourceMapName: 'dest/<%= pkg.name %>.map'
        },
        files: {
          'dest/<%= pkg.name %>.min.js': ['src/js/*']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default tasks.
  grunt.registerTask('default', ['cssmin:combine', 'uglify:js']);
};