
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
      
      
    var apiDirectory = 'src/api/';
    var destDirectory = 'src/api/';
    
    //console.log('API generator' + apiDirectory);
  
        console.log(chalk.blue("Generating API layer.."));
        this.template(
            this.templatePath(apiDirectory + 'DefaultAPI.ts'),
            this.destinationPath(destDirectory + this.microserviceName+'API.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );
        
        this.template(
            this.templatePath(apiDirectory + 'IDefaultAPI.ts'),
            this.destinationPath(destDirectory + 'I' + this.microserviceName +'API.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );
        
        
          try {
        
            fs.statSync(this.destinationPath(destDirectory + 'IAPI.ts')); 
          
          } catch (e) {
        
              
            this.template(
                this.templatePath(apiDirectory + 'IAPI.ts'),
                this.destinationPath(destDirectory + 'IAPI.ts'),{
                    microserviceName : this.microserviceName,
                    microserviceNameLC : this.microserviceNameLC
                }
            );              

            this.template(
                this.templatePath(apiDirectory + 'API.ts'),
                this.destinationPath(destDirectory + 'API.ts'),{
                    microserviceName : this.microserviceName,
                    microserviceNameLC : this.microserviceNameLC
                }
            );      
        }      
  }
});

