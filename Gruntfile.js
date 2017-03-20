module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      js: {
        src: ['client/app/**/*.js'],
        dest: 'build/js/scripts.js',
      },
      css: {
        src: ['client/styles/**/*.css'],
        dest: 'build/css/styles.css',
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'client/',
          src: ['**/*.js'],
          dest: 'build/'
        }]
      }
    },

    jshint: {
      all: ['client/app/**/*.js']
    },

    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'build/app',
          src: '**/*.js',
          dest: 'deploy/client/app/'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          src: ['client/**/*.html', '*.html'],
          dest: 'deploy'
        }]
      }
    },

    cssmin: {
      target: {
        files: {
          'deploy/client/styles/styles.css': ['build/css/styles.css']
        }
      }
    },

    watch: {
      js: {
        files: ['client/app/**/*.js'],
        tasks: ['concat', 'babel', 'uglify'],
      },
      css: {
        files: ['client/styles/**/*.css'],
        tasks: ['concat', 'cssmin'],
      },
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('start', ['nodemon']);
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['babel', 'uglify', 'cssmin', 'htmlmin']);
}
