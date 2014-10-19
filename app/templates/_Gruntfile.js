module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    path: {
      src: './src',
      dev: './dev',
      dest: './build',
      tmp: './tmp'
    },

    clean: {
      dev: ['<%= path.dev %>', '<%= path.tmp %>', '<%= path.dest %>']
    },

    assemble: {
      options: {
        layoutdir: '<%= path.src %>/layouts',
        partials: ['<%= path.src %>/partials/*.hbs']
      },
      dev: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages/',
            src: '*.hbs',
            dest: '<%= path.dev %>'
          }
        ]
      },
      build: {
        options: {
          layout: 'default.hbs'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/pages/',
            src: '*.hbs',
            dest: '<%= path.dest %>'
          }
        ]
      }
    },

    sass: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss/',
            src: '*.scss',
            dest: '<%= path.dev %>/css/',
            ext: '.css'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= path.src %>/scss/',
            src: '*.scss',
            dest: '<%= path.dest %>/css/',
            ext: '.css'
          }
        ]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['src/**/*.hbs'],
        tasks: ['assemble'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },

    connect: {
      server: {
        options: {
          base: '<%= path.dev %>',
          livereload: true
        }
      }
    }

  });

  grunt.registerTask('default', ['clean']);
  grunt.registerTask('serve', ['clean', 'assemble', 'sass', 'connect', 'watch']);
};
