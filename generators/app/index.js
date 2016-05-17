var generators = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var inquirer = require("inquirer");
var path = require("path");
var mkdirp = require("mkdirp");
var fs = require("fs");
var jsonUpdate = require("json-update");


var BaseGenerator = generators.Base.extend({
    
    
    constructor:function() {
        generators.Base.apply(this, arguments);
        
        //this.argument('dest', {type:String});
        
        //this.argument('appName', {type:String, required : true});
        //this.log("Application name : " + this.appname);
    },
    
    generateAllOthers : function() {

        // this.generatePackageJson();
         
         
         this.copyStaticConfigFiles('README.MD');
         this.copyStaticConfigFiles('tsconfig.json');
         this.copyStaticConfigFiles('webpack.config.js');
        //  this.copyStaticConfigFiles('inversify.config.ts');
         this.copyStaticConfigFiles('tslint.json');
         this.copyStaticConfigFiles('typings.json');
        //  this.copyStaticConfigFiles('app.ts');
         this.copyStaticConfigFiles('.gitignore');
         this.copyStaticConfigFiles('.npmrc');
         this.copyStaticConfigFiles('gulpfile.js');
         
         this.copyStaticConfigFiles('apidoc.json');
         this.copyStaticConfigFiles('jsdoc.json');
         
         // Typings
         this.copyStaticConfigFiles('typings/index.d.ts');
         
         // Config
         this.copyStaticConfigFiles('src/app.ts');
         this.copyStaticConfigFiles('src/inversify.config.ts');
         this.copyStaticConfigFiles('package.json');
    },
    
    copyStaticConfigFiles : function(fileName, destfileName) {
        
         this.template(
            this.templatePath(fileName),
            this.destinationPath(destfileName ? destfileName : fileName),{
                microserviceName : microserviceName,
                version : version,
                microserviceNameLC : microserviceNameLC,
                developerName : developerName,
                developerEmail : developerEmail,
                description: description
            }
        );
    },
    
    copyAppConfigurations : function () {
         this.template(
            this.templatePath('config'),
            this.destinationPath('config'), {
                microserviceName : microserviceName,
                microserviceNameLC : microserviceNameLC,
                developerName : developerName,
                developerEmail : developerEmail,
                description: description
            }
        );
    },
    
//     generatePackageJson : function () {
       
//         var updatedJson = {
//             name : microserviceNameLC + "-microservice",
//             description : description,
//             author :  {
//                 name : developerName,
//                 email : developerEmail
//             }
//         };
        
//         var json = JSON.parse(fs.readFileSync(this.templatePath('package.json'), 'utf-8'));
// //        console.log(json);
               
//         var outputFilename = this.destinationPath('package.json');       
//         fs.writeFile(outputFilename, JSON.stringify(json, null, 4), function(err) {
//             if(err) {
//                 console.log(err);
//             } else {
                
//                 jsonUpdate.update(outputFilename,updatedJson)
//                      .then(function(dat) { 
//                          //console.log(dat);
//                 });
//             }
//         });  
//     }
    
});

module.exports = BaseGenerator.extend({
    
    
    initializing : function() {
      
      // this.composeWith('microservice-template:api');
    },
    

    prompting : function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Hello, Welcome to Pheonix NodeJS Microservice Template generator (' + chalk.red('generator-microservice-template')  + ' ), Enjoy Coding!'
        ));

        var prompts = [{
            type: 'input',
            name: 'microserviceName',
            message: 'Your microservice name ?',
            default: this.appname,
            validate : function(input) {
                
                if (input === '' || input == 'undefined') {
                    done("Microservice name cannot be Empty!");
                }
                
                var done = this.async();
                if (!(new RegExp("^[a-zA-Z()]+$").test(input))) {
                    done("Microservice name should only be Letters");
                }
                
                done(null, true);
            }
        }, 
        {
            type : 'input',
            name:"version",
            message : "microservice version ? ",
            default : "",
        },        
        {
            type : 'input',
            name:"description",
            message : "Short Description about this service ? ",
            default : "",
        },
        {
            type : 'input',
            name:"developerName",
            message : "Developer git username ? ",
            store : true
        },
        {
            type : 'input',
            name:"developerEmail",
            message : "Developer git email ? ",
            store : true,
        }
        ];

        inquirer.prompt(prompts).then(function (props) {
            
            // developer entered
            var name = props.microserviceName;
            // folder name with appending -microservice
            this.foldername = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() + "-microservice";
            
            //All other microservice artifacts name
            this.microserviceName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            
            // description for this microservice
            this.description = props.description;
            
            // lowercase
            this.microserviceNameLC = this.microserviceName.toLowerCase();
            
            // Developer
            this.developerName = props.developerName;
            this.developerEmail = props.developerEmail;
            
            // version
            this.version = props.version;

            done(null, true);
        });
        
    },
    
     configuring : function() {
        
        //this.sourceRoot(path.resolve(__dirname, '..') + '/templates');
        
        // console.log('srcPath' + this.sourceRoot());
        // console.log('srcPath' + this.templatePath());
        
     },

    writing: function () {  
        
        console.log(chalk.blue("Generating source code.."));
        // // Invoking microservice api creation sub-generator
      
        //var srcRoot = this.sourceRoot();
        
        // Invoking API layer
        this.composeWith('microservice-template:api', {
            options : {
                name : microserviceName
            },
            local: require.resolve('../api')
        });
        
        // Invoking Data access layer
        this.composeWith('microservice-template:dal', {
            options : {
                name : microserviceName
            },
            local: require.resolve('../dal')
        });
        
         // invoking service layer
        this.composeWith('microservice-template:service', { 
            options : { 
                name : microserviceName
            },
            local: require.resolve('../service')
        });
        
         // invoking service layer
        this.composeWith('microservice-template:test', { 
            options : { 
                name : microserviceName
            },
            local: require.resolve('../test')
        });        
                                  
        // copy app configurations.
         this.copyAppConfigurations();
       
        // Generate configuration files.
         this.generateAllOthers();     
        
    },
 
    install: function () {
      // this.npmInstall();
    },
    
    end : function() {
       // this.spawnCommand('gulp', ['default']);
        
    }
    
});