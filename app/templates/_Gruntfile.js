module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  grunt.initConfig({

    path: {
      dev: './dev'
    },

    clean: {
      dev: ['<%= path.dev %>']
    }

  });

  grunt.registerTask('default', ['clean']);
};
