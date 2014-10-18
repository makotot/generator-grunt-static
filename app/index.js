'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var GruntStaticGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the luminous GruntStatic generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      default: 'my static site'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('src');
      this.dest.mkdir('src/layouts');
      this.dest.mkdir('src/partials');
      this.dest.mkdir('src/data');
      this.dest.mkdir('src/pages');
      this.dest.mkdir('src/scss');
      this.dest.mkdir('src/scss/base');
      this.dest.mkdir('src/scss/layouts');
      this.dest.mkdir('src/scss/modules');
      this.dest.mkdir('src/scss/utils');
      this.dest.mkdir('src/js');

      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.src.copy('_Gruntfile.js', 'Gruntfile.js');

      this.template('src/_default.hbs', 'src/layouts/default.hbs');
      this.src.copy('src/_index.hbs', 'src/pages/index.hbs');
      this.src.copy('src/_header.hbs', 'src/partials/header.hbs');
      this.src.copy('src/_footer.hbs', 'src/partials/footer.hbs');
      this.src.copy('src/_main.scss', 'src/scss/main.scss');
      this.src.copy('src/_base.scss', 'src/scss/base/_base.scss');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('eslintrc', '.eslintrc');
      this.src.copy('gitignore', '.gitignore');
    }
  },

  end: function () {
    this.npm();
    this.bower();
  },
  npm: function () {
    var done = this.async();

    this.npmInstall([
      'grunt',
      'time-grunt',
      'jit-grunt',
      'grunt-contrib-connect',
      'grunt-contrib-watch',
      'grunt-eslint',
      'assemble',
      'grunt-contrib-sass',
      'grunt-contrib-clean',
      'grunt-contrib-copy'
    ], {'saveDev': true}, done);
  },
  bower: function () {
    var done = this.async();

    this.bowerInstall([
      'normalize-css'
    ], {
      'saveDev': true
    }, done);
  }
});

module.exports = GruntStaticGenerator;
