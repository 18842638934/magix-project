var tmplFolder = 'tmpl'; //template folder
var srcFolder = 'src'; //source folder
var buildFolder = 'build'; //build folder
var pkg = require('./package.json');

var gulp = require('gulp');
var watch = require('gulp-watch');
var fs = require('fs');
var del = require('del');
var combineTool = require('../magix-combine/index');
var ts = require('typescript');
combineTool.config({
    tmplFolder: tmplFolder,
    srcFolder: srcFolder,
    cssSelectorPrefix: 'p',
    compressCss: false,
    compressCssSelectorNames: true,
    md5CssSelectorLen: 3,
    bindName: 'syncValue',
   // compressTmplVariable:true,
    scopedCss: [
        './tmpl/app/snippets/cube-neat.css',
        './tmpl/app/snippets/app-normalize.less',
        './tmpl/app/snippets/app-layout.less',
        './tmpl/app/snippets/app-iconfont.less',
        './tmpl/app/snippets/app-loading.less',
        './tmpl/app/snippets/app-btn.less',
        './tmpl/app/snippets/app-form.less',
        './tmpl/app/snippets/app-dialog.less',
        './tmpl/app/snippets/app-table.less',
        './tmpl/app/snippets/app-util.less'
    ],
    //compileTmplCommand(content) {
    //    var str = ts.transpileModule(content, {
    //        compilerOptions: {
    //            lib: ['es7'],
    //            target: 'es3',
    //            module: ts.ModuleKind.None
    //        }
    //    });
    //    //console.log(str);
    //    str = str.outputText;
    //    return str;
    //},
    compileBeforeProcessor(content, from) {
        //console.log('compile ',from);
        var str = ts.transpileModule(content, {
            compilerOptions: {
                lib: ['es7'],
                target: 'es3',
                module: ts.ModuleKind.None
            }
        });
        str = str.outputText;
        return str;
    }
});

gulp.task('updateVer', () => {
    let file = './tmpl/app/views/index.html';
    let content = fs.readFileSync(file) + '';
    content = content.replace(/Magix\s+Project\([^)]+/, 'Magix Project(' + pkg.version);
    content = content.replace(/magix\-combine\([^)]+/, 'magix-combine(' + pkg.dependencies['magix-combine']);
    let temp = fs.readFileSync('./tmpl/app/snippets/magix.js') + '';
    let tempVer = temp.substring(0, 300).match(/\/\*!([^\s]+)\s+Licensed/);
    if (tempVer) {
        content = content.replace(/Magix\([^)]+/, 'Magix(' + tempVer[1]);
    }
    temp = fs.readFileSync('./tmpl/app/snippets/jquery.js') + '';
    tempVer = temp.substring(0, 300).match(/Library\s+v([^\r\n]+)/);
    if (tempVer) {
        content = content.replace(/jQuery\([^)]+/, 'jQuery(' + tempVer[1]);
    }
    fs.writeFileSync(file, content);
});

gulp.task('cleanSrc', function() {
    return del(srcFolder);
});
gulp.task('combine', ['cleanSrc', 'updateVer'], function() {
     //combineTool.processFile('./tmpl/app/gallery/mx-dropdown/index.js').catch((ex) => {
     //    console.log(ex);
     //});
     //return;
    return combineTool.combine().then(function() {
        console.log('complete');
    }).catch(function(ex) {
        console.log('gulpfile:', ex);
        process.exit();
    });
});

gulp.task('watch', ['combine'], function() {
    watch(tmplFolder + '/**/*', function(e) {
        if (fs.existsSync(e.path)) {
            var c = combineTool.processFile(e.path);
            c.catch(function(ex) {
                console.log('ex', ex);
            });
        } else {
            combineTool.removeFile(e.path);
        }
    });
});

var uglify = require('gulp-uglify');
gulp.task('cleanBuild', function() {
    return del(buildFolder);
});
gulp.task('build', ['cleanBuild', 'cleanSrc', 'updateVer'], function() {
    combineTool.config({
        compressCss: true
    });
    combineTool.combine().then(() => {
        gulp.src(srcFolder + '/**/*.js')
            .pipe(uglify({
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            }))
            .pipe(gulp.dest(buildFolder));
    });
});

gulp.task('spm', () => {
    combineTool.config({
        tmplTagProcessor(tag) {
            if (tag.indexOf('data-spm') == -1) {
                let now = Date.now();
                return tag.slice(0, -1) + ` data-spm="abc${now}">`;
            }
            return tag;
        }
    });
    combineTool.processTmpl().then(() => {
        console.log('tmpl complete');
    });
});