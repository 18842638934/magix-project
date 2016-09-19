var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder
var excludeTmplFolders = [
    'tmpl/libs/'
];
var onlyAllows = {
    '.html': 1,
    '.css': 1,
    '.json': 1
};


var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var del = require('del');
var combineTool = require('magix-combine');

combineTool.config({
    excludeTmplFolders: excludeTmplFolders,
    onlyAllows: onlyAllows,
    useMagixTmplAndUpdater: true,
    prefix: 'mp-',
    snippets: {
        loading: '<div class="loading"><span></span></div>'
    }
});

gulp.task('cleanSrc', function() {
    return del(srcFolder);
});
gulp.task('combine', ['cleanSrc'], function() {
    combineTool.combine();
});

gulp.task('watch', ['combine'], function() {
    watch(tmplFolder + '/**/*', function(e) {
        if (fs.existsSync(e.path)) {
            combineTool.processFile(e.path);
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild'], function() {
    gulp.src(srcFolder + '/**/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }))
        .pipe(gulp.dest(buildFolder));

    gulp.src(srcFolder + '/**/*.css')
        .pipe(cssnano({
            safe: true
        }))
        .pipe(gulp.dest(buildFolder));
});