module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        files: {
          'releases/ggrid-v<%= pkg.version %>.min.css': 'src/*styl',
          'welcome/assets/css/main.css': 'welcome/assets/styl/*.styl'
        }
      }
    },
    watch: {
      css: {
        files: ['src/*styl', 'welcome/assets/styl/*.styl'],
        tasks: ['stylus']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['stylus']);
};