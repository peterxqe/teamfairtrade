module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'dist/assets/style.css': 'src/assets/style.scss'
				}
			}
		},
		watch: {
			sass: {
				// We watch and compile sass files as normal but don't live reload here
				files: ['src/assets/**/*.scss'],
				tasks: ['sass'],
			},
			html: {
				files: ['src/**.html'],
				tasks: ['copy:main'],
			},
			images: {
				files: ['src/**.png'],
				tasks: ['copy:main'],
			},
			configFiles: {
				files: [ 'Gruntfile.js' ],
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: 'dist',
				}
			},
			options: {
				open: true,
			},
		},
		mkdir: {
			all: {
				options: {
					create: ['dist']
				},
			},
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src', src: ['**/*.html', '**/*.png'], dest: 'dist/', filter: 'isFile'},
				],
			},
		},
	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-mkdir');
	
	
	grunt.registerTask('default', ['sass','mkdir','copy:main','connect','watch']);
};
