module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        options: {
          banner: '/*\n' +
                  '* <%= pkg.name %> v<%= pkg.version %> ' +
                  '(<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
                  '* License: <%= pkg.license %>\n' +
                  '* Url: <%= pkg.url %>\n' +
                  '* Repository: <%= pkg.repository.url %>\n' +
                  '*/\n',
          compress: true
        },
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