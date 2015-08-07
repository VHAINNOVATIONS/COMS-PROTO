/*
 * Make sure Grunt and it's necessary dependancies are installed...
 * npm install
 * npm install -g grunt-cli
 * npm install grunt --save-dev
 * npm install jshint-junit-reporter
 * npm install grunt-contrib-concat --save-dev
 * npm install grunt-contrib-jshint --save-dev
 * npm install grunt-junit-report --save-dev
 * npm install grunt-xsltproc --save-dev
 * npm install grunt-phplint
 * Ensure PHP is in the path
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    concat: {
      options: {
        process: function(src, filepath) {
          f1 = "/***************** Source: " + filepath + " *************************/\n\r\n\r\n\r";
          // return "\n\r" +f1+ src;
          return src;
        },
      },
      dist: {
        src: ["app/LocalizedCode.js", "app/js/Consts.js", "libs/ExtJS_4.1.0/examples/ux/*.js", "libs/ExtJS_4.1.0/examples/ux/**/*.js", "app/js/Extensions.js", "app/js/app/ux/**/*.js", "app/js/app/model/*.js", "app/js/app/store/*.js","app/js/app/view/**/*.js","app/js/app/controller/**/*.js", "app/js/app.js" ],
        dest: "app/js/<%= pkg.name %>-build.js"
      }
    },

	uglify: {
		options: {
			quoteStyle: 0,
			beautify : true,
			mangle : false,
			preserveComments : "all"
		},
		COMS: {
			files: [{
				expand: true,
				src: ["app/*.js", "app/js/**/*.js"],
				dest: "build/scripts"
			}]
		}
	},

    jshint_OLD: {
		options: {
			"reporter" : require("jshint-junit-reporter"),
			"reporterOutput" : "./reports/output/junit-output1.xml",

//			"reporterOutput" : "jshint.output.txt",
//			"indent" : true,
			"strict" : false,	/* Note: ExtJS doesn't support strict mode in JS (see http://www.sencha.com/forum/showthread.php?132503-callParent()-breaks-Firefox-when-using-js-strict-mode&p=598896&viewfull=1#post598896) */
//			"white" : false,
			"eqeqeq" : false,
//			"smarttabs" : true,
//			"laxcomma" : true,
//			"undef": true,
//			"unused": true,
			"debug" : true,
			"-W030" : false,
			"-W041" : false,
			"predef": [ 
				"alert",
				"Ext",
				"wccConsoleLog",
				"dName"		/* global var set in main.php */
			],


    /* Use '===' to compare with ... (W041) */
    "-W041": false,
    /* Don't make functions within a loop. (W083) */
    "-W083" : false,
    /* Forgotten 'debugger' statement? (W087) */
    "-W087" : false,
    "-W099" : false,
    "-W075" : false


		},
		files: ["app/*.js", "app/js/**/*.js"]
	},


	jshint: {
		options : {
			reporter: require("jshint-html-reporter"),
			reporterOutput: "./reports/output/jshint-report.html",
			"debug" : true,
			"-W030" : false,
			"-W041" : false,
			"-W083" : false
		},
		files: ["./app/LocalizedCode.js", "./app/js/**/*.js"],
		ignores : [
				"./app/js/COMS - 5Aug2015.js", 
				"./app/js/COMS-build.js", 
				"./app/js/COMS.js", 
				"./app/jquery-1.7.1.min.js"
		]
	},

	watch: {
		files: ['<%= jshint.files %>'],
		tasks: ['jshint']
	},



	junit_report : {
		options : {
			xmlFolder : "./reports/xml",
			outputFolder : "./reports/output"
		}
	},

	phplint: {
		options: {
			swapPath: "_Temp/"
		},
		all: [
			"app/*.php", "framework/**/*.php"
		]
	},

    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint", "qunit"]
    }
  });

	grunt.loadNpmTasks("grunt-phplint");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-junit-report");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default1", ["jshint", "junit_report", "concat", "uglify"]);
	grunt.registerTask("default", ["uglify"]);

};
