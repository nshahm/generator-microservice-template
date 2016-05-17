
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
    this.data = data;
    //this.sourceRoot(path.resolve(__dirname, '..') + '/templates');
    
    var microserviceName = this.data.charAt(0).toUpperCase() + this.data.slice(1).toLowerCase();
    this.microserviceName = microserviceName;     
    // lowercase
    var microserviceNameLC = microserviceName.toLowerCase();
    this.microserviceNameLC = microserviceNameLC;
    },

  writing : function () {
      
        var srcDirectory = 'src/dal/dao/';
        var destDirectory = 'src/dal/dao/';
  
        console.log(chalk.blue("Generating Data Access layer..."));
        this.template(
            this.templatePath(srcDirectory + 'DefaultDAO.ts'),
            this.destinationPath(destDirectory + this.microserviceName+'DAO.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );

        this.template(
            this.templatePath(srcDirectory + 'IDefaultDAO.ts'),
            this.destinationPath(destDirectory + 'I'+ this.microserviceName+'DAO.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );  
  }
});


