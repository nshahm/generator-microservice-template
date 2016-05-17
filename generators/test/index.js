
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
      
      
    var apiDirectory = 'test/';
    var destDirectory = 'test/';
    
 
        console.log(chalk.blue("Generating specs.."));
         this.template(
            this.templatePath(apiDirectory + 'api/DefaultServiceSpec.ts'),
            this.destinationPath(destDirectory + 'api/' + this.microserviceName+'APIServiceSpec.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );
        
         this.template(
            this.templatePath(apiDirectory + 'dal/DefaultDAOSpec.ts'),
            this.destinationPath(destDirectory + 'dal/' + this.microserviceName+'DAOSpec.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );
        
     // Creating TestApp.ts
        try {
    
        fs.statSync(this.destinationPath(destDirectory + 'test/TestApp.ts')); 
        
        } catch (e) {
    
            
         this.template(
            this.templatePath(apiDirectory + 'TestApp.ts'),
            this.destinationPath(destDirectory + 'TestApp.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );    
        }          
        
    // Creating Testing.ts
        try {
    
        fs.statSync(this.destinationPath(destDirectory + 'test/Testing.ts')); 
        
        } catch (e) {
            
         this.template(
            this.templatePath(apiDirectory + 'Testing.ts'),
            this.destinationPath(destDirectory + 'Testing.ts'),{
                microserviceName : this.microserviceName,
                microserviceNameLC : this.microserviceNameLC
            }
        );    
        }
  }
});
