
var util = require('util');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
//var ScriptBase = require('../script-base.js');
var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    var data = this.options.name || this.args[0];
    console.log('data = ' + data);
    this.data = data;
    //this.sourceRoot(path.resolve(__dirname, '..') + '/templates');
    
    var microserviceName = this.data.charAt(0).toUpperCase() + this.data.slice(1).toLowerCase();
    this.microserviceName = microserviceName;     
    // lowercase
    var microserviceNameLC = microserviceName.toLowerCase();
    this.microserviceNameLC = microserviceNameLC;
  },

  writing : function () {
      
    var apiDirectory = 'src/service/';
    var destDirectory = 'src/service/';

    console.log(chalk.blue("Generating service layer..."));
    this.template(
        this.templatePath(apiDirectory + 'DefaultService.ts'),
        this.destinationPath(destDirectory + this.microserviceName+'Service.ts'),{
            microserviceName : this.microserviceName,
            microserviceNameLC : this.microserviceNameLC
        }
    );
    
    this.template(
        this.templatePath(apiDirectory + 'IDefaultService.ts'),
        this.destinationPath(destDirectory + 'I' + this.microserviceName+'Service.ts'),{
            microserviceName : this.microserviceName,
            microserviceNameLC : this.microserviceNameLC
        }
    );
    
    try {

    fs.statSync(this.destinationPath('src/helpers')); 
    
    } catch (e) {
    
    // copying helpers
    this.template(
        this.templatePath('src/helpers'),
        this.destinationPath('src/helpers'),{
            microserviceName : this.microserviceName,
            microserviceNameLC : this.microserviceNameLC
        }
    );
    }
  }
});
