/*global module:false*/
module.exports = function (grunt) {

    var submodules = loadSubmodules();

    // load submodules config
    function loadSubmodules () {

        var submoduleFile = grunt.file.read( '.gitmodules' ),
            match = null,
            modules = [],
            pattern = /\[submodule ('|")([\s\S]*?)\1\]/g;

        while ( match = pattern.exec( submoduleFile ) ) {

            modules.push( match[2] )

        }

        return modules;

    }

    grunt.initConfig({

        // 最终代码合并
        concat: {

            full: {

                options: {

                    banner: '/*!\n' +
                        ' * ====================================================\n' +
                        ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                        ' * GitHub: <%= pkg.repository.url %> \n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                        ' * ====================================================\n' +
                        ' */\n\n' +
                        '(function () {\n',

                    footer: '})();'

                },

                dest: 'dist/<%= fullFileName %>',
                src: [ '.tmp_build/kf.tmp.js', '<%= target %>/dev-lib/exports.js' ]

            }

        },

        // 压缩
        uglify: {

            options: {

                banner: '/*!\n' +
                    ' * ====================================================\n' +
                    ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
                    ' * GitHub: <%= pkg.repository.url %> \n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
                    ' * ====================================================\n' +
                    ' */\n',

                beautify: {
                    ascii_only: true
                }

            },

            minimize: {

                dest: 'dist/<%= minFileName %>',
                src: 'dist/<%= fullFileName %>'

            }

        },

        // 模块依赖合并
        dependence: {

            replace: {

                options: {
                    base: '<%= target %>/src',
                    entrance: 'kf.start'
                },

                files: [ {
                    src: [ '<%= target %>/src/**/*.js', '<%= target %>/dev-lib/start.js' ],
                    dest: '.tmp_build/kf.tmp.js'
                } ]

            }
        },

        // hint检查
        jshint: {
            options: {
                ignores: [ '<%= target %>/src/base/canvg.js' ],
                jshintrc: '<%= target %>/.jshintrc'
            },
            source: [ '<%= target %>/src/**/*.js' ]
        },

        // 临时目录清理
        clean: {
            files: [ '.tmp_build' ]
        }

    });

    function getFileName ( name, isMin ) {

        return name.replace( /[A-Z]/g, function ( match, index ) {

            if ( index === 0 ) {
                return match.toLowerCase();
            } else {
                return '-' + match.toLowerCase();
            }

        } ) + ( isMin ? '.all.min.js' : '.all.js' );

    }

    function getSubmoduleTaskConfig () {

    }

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-module-dependence');

    /* build 任务 */
    grunt.registerTask( 'build', function () {

        var target = grunt.option( 'target' );

        grunt.config.set( 'config', getSubmoduleTaskConfig() );

        grunt.log.writeln( '' );

        if ( target === undefined ) {

            for ( var i = 0, len = submodules.length; i < len; i++ ) {

                build( submodules[ i ] );

            }

        } else if ( submodules.indexOf( target ) !== -1 ) {

            build( target );

        } else {
            grunt.fail.fatal( 'Illegal target, legal target is: ' + submodules.join( ', ' ).cyan );
        }

    } );

    /**
     * 该任务是一个哨兵任务， 其作用是动态调整当前执行的子项目
     */
    grunt.task.registerMultiTask( 'config', function () {

        var target = this.target,
            pkg = grunt.file.readJSON( target + '/package.json' );

        grunt.config.set( 'pkg', pkg );
        grunt.config.set( 'target', target );
        grunt.config.set( 'fullFileName', getFileName( pkg.name, false ) ) ;
        grunt.config.set( 'minFileName', getFileName( pkg.name, true ) ) ;

    } );

    function build ( target ) {

        grunt.task.run( [ 'config:' + target, 'dependence', 'concat', 'uglify', 'clean' ] );

    }

};
