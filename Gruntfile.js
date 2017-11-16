module.exports = function(grunt) {
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    options: {
      separator: ';',
    },
    dist: {
      //Código para src y build
      src: ['src/js/loader.js', 'src/js/dropUpSwipe.js','src/js/swipeNavigation.js','src/js/interaccionMenu.js','src/js/menuCuentos.js','src/js/cuento1.js', 'src/js/cuento2.js', 'src/js/cuento3.js','src/js/inventario.js','src/js/expand.js','src/js/dropUpCuento.js','src/js/manualUso.js',  'src/js/sonidos.js' ],
      dest: 'src/js/main.js',
     },
    extras:{
      //Código para app, se mezcla el index.js y no el main.js
      src: ['src/js/main.js'],
      dest: 'src/js/mainCordova.js',
    },
  },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        //Se minifica el main.js
        src: ['src/js/main.js'],
        dest: 'build/js/main.min.js'
      },extra: {
        //Se minifica el mainCordova.js
        src: ['src/js/mainCordova.js'],
        dest: 'app/www/js/main.min.js'
      }
    },
cssmin: {
  my_target: {
      src: ['src/css/main.css'],
      dest: 'build/css/main.min.css'
  }
},
copy: {
  main: {
    files: [
      // includes files within path using cwd
      //Se copian archivos de src a build y app/www/
      {expand: true, cwd:'src/',src: ['img/**','index.html','fonts/**','css/**'], dest: 'build/'},
      {expand: true, cwd:'src/',src: ['img/**','index.html','fonts/**','css/**'], dest: 'app/www/'},
    ],
  },
},replace: {
        example: {
          //Se cambia la referenciación de los archivos a los minificados
          src: ['build/index.html'],             // source files array (supports minimatch)
          dest: 'build/index.html',             // destination directory or file
          replacements: [
             {
                  from: '.js',                   // string replacement
                  to: '.min.js'
             },
             {
                  from: '.css',
                  to: '.min.css'
             },
             {
                  from: '.min.min.css',
                  to: '.min.css'
             },
             {
                  from: '.min.min.js',
                  to: '.min.js'
             }
          ]
        },
        another: {
          src: ['app/www/index.html'],             // source files array (supports minimatch)
          dest: 'app/www/index.html',             // destination directory or file
          replacements: [
             {
                  from: '.js',                   // string replacement
                  to: '.min.js'
             },
             {
                  from: '.css',
                  to: '.min.css'
             },
             {
                  from: '.min.min.css',
                  to: '.min.css'
             },
             {
                  from: '.min.min.js',
                  to: '.min.js'
             },
             {
                  from: '</body>',
                  to: '<script type="text/javascript" src="cordova.js"></script><script type="text/javascript">app.initialize();</script></body>'
              }
          ]
        }
   }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify','cssmin','copy','replace']);
};