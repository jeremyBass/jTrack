module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			min: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'distro/<%= pkg.name %>.<%= pkg.version %>.min.js'
			}
		},
		copy:{
			full:{
				ready: [
					{ flatten: true, expand: true, src: ["src/<%= pkg.name %>.js"], dest: "distro/<%= pkg.name %>.js"},
					{ expand: true, src: ["src/tracking/*"], dest: "distro/tracking/"},
					{ flatten: true, expand: true, src: ["distro/<%= pkg.name %>.js"], dest: "<%= pkg.name %>.js"},
					{ flatten: true, expand: true, src: ["distro/<%= pkg.name %>.<%= pkg.version %>.min.js"], dest: "<%= pkg.name %>.<%= pkg.version %>.min.js"}
				]
			}
		},
		jshint: {
			src: ['src/*.js'],
			options: {
				smarttabs: true,
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					require: true,
					define: true,
					requirejs: true,
					describe: true,
					expect: true,
					it: true,
					_gat: true,
					jQuery: true,
					console: true,
					module: true,
					document: true,
					window:true
				}
			}
		},
		watch: {
			files: '<%= jshint.src %>',
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Load JSHint task
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Default task(s).
	grunt.registerTask('default', ['jshint','uglify']);

};