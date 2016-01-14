module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      src: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> (<%= pkg.repository.url %>)\n' +
                  '!*/',
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
          'doc/assets/css/doc.min.css': 'doc/assets/styl/*.styl'
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 1,
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      src: {
        files: {
          'dist/ggrid.min.css': 'dist/ggrid.min.css'
        }
      },
      doc: {
        files: {
          'doc/assets/css/doc.min.css': 'doc/assets/css/doc.min.css'
        }
      }
    },
    concat: {
      dist: {
        files: {
          'doc/assets/dist.min.js': 'doc/assets/js/**/*.js'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'doc/assets/dist.min.js': 'doc/assets/dist.min.js'
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
          client: false
          //pretty: true
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
        tasks: ['stylus:src', 'cssmin:src']
      },
      doc: {
        files: ['doc/assets/styl/**/*.styl'],
        tasks: ['stylus:doc', 'cssmin:doc']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jade-i18n');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', ['stylus', 'concat', 'jade']);
  grunt.registerTask('build', ['dev', 'cssmin', 'uglify']);
  grunt.registerTask('start', ['dev', 'http-server', 'watch']);

};
