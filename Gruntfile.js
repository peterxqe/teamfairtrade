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
				tasks: ['sass']
			},
			html: {
				files: ['src/**.html'],
				tasks: ['copy:main']
			},
			images: {
				files: ['src/**.png', 'src/**.jpg', 'src/**.gif', 'src/**.svg'],
				tasks: ['copy:main']
			},
			configFiles: {
				files: [ 'Gruntfile.js' ],
				options: {
					reload: true
				}
			}
		},
		connect: {
			server: {
				options: {
					open: true,
					port: 8080,
					base: 'dist'
				}
			}
		},
		mkdir: {
			all: {
				options: {
					create: ['dist']
				}
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.html', 'src/**.png', 'src/**.jpg', 'src/**.gif', 'src/**.svg'],
					dest: 'dist/',
					filter: 'isFile'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-mkdir');

	grunt.registerTask('default', ['mkdir','sass','copy:main','connect','watch']);
};
