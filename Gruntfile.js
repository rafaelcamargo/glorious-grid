module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      src: {
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
          'dist/ggrid.min.css': 'src/*styl',
        }
      },
      doc: {
        options: {
          compress: true
        },
        files: {
          'doc/assets/css/doc.css': 'doc/assets/styl/*.styl'
        }
      }
    },
    concat: {
      dist: {
        files: {
          'doc/assets/dist.js': 'doc/assets/js/**/*.js'
        }
      }
    },
    jade: {
      html: {
        files: {
          'doc/index.html': 'doc/assets/jade/index.jade'
        },
        options: {
          i18n: {
            locales: 'doc/assets/jade/locales/*.json',
            namespace: '$i18n'
          },
          client: false,
          pretty: true
        }
      }
    },
    'http-server': {
      'dev': {
        port: 9000,
        host: "0.0.0.0",
        runInBackground: true
      }
    },
    watch: {
      src: {
        files: ['src/**/*.styl'],
        tasks: ['stylus:src']
      },
      doc: {
        files: ['doc/assets/styl/**/*.styl'],
        tasks: ['stylus:doc']
      },
      script: {
        files: ['doc/assets/js/**/*.js'],
        tasks: ['concat']        
      },
      jade: {
        files: ['doc/**/*.jade','doc/assets/jade/locales/*.json'],
        tasks: ['jade']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jade-i18n');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['stylus', 'concat', 'jade']);
  grunt.registerTask('start', ['stylus', 'http-server', 'watch']);

};
