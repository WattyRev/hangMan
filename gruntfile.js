var js = [
    'app/js/bower_components/angular/angular.min.js',
    'app/js/bower_components/jquery/dist/jquery.min.js',
    'app/js/app.js',
    'app/js/controllers/**.js',
    'app/js/directives/**.js',
    'app/js/services/**.js',
];


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      scripts: {
        files: ['**/*.less'],
        tasks: ['clean', 'less:development'],
        options: {
          spawn: false,
        },
      },
    },

    connect: {
        server: {
            options: {
                port: 9000,
                base: 'app'
            }
        }
    },

    less: {
      development: {
        options: {
          paths: ["app"]
        },
        files: {
          "app/css/style.css": "app/less/**.less"
        }
        }
    },
    injector: {
        options: {
            ignorePath: 'app/'
        },
        local_dependencies: {
          files: {
            'app/index.html': js,
          }
        }
    },

    // Deletes all .js files, but skips min.js files
    clean: {
      css: ["app/css/**.css"]
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-injector');

  grunt.registerTask('run', [
     'clean',
     'less',
     'injector',
     'connect',
     'watch'
  ]);

};
