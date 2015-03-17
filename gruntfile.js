/*
 *
 * npm install
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: ['app/LocalizedCode.js', 'app/js/Consts.js', 'libs/ExtJS_4.1.0/examples/ux/*.js', 'libs/ExtJS_4.1.0/examples/ux/**/*.js', 'app/js/Extensions.js', 'app/js/app/ux/**/*.js', 'app/js/app/model/*.js', 'app/js/app/store/*.js','app/js/app/view/**/*.js','app/js/app/controller/**/*.js', 'app/js/app.js', ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
		options: {
			"reporter" : require("jshint-junit-reporter"),
			"reporterOutput" : "./reports/output/junit-output.xml",

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
			]
		},
		files: ['app/js/**/*.js']
	},



	junit_report : {
		options : {
			xmlFolder : "./reports/xml",
			outputFolder : "./reports/output"
		}
	},


    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint', 'junit_report', 'concat']);

};