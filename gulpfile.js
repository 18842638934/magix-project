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
var path = require('path');
var watch = require('gulp-watch');
var fs = require('fs');
var del = require('del');
var combineTool = require('magix-combine');

combineTool.config({
    htmlminifierOptions: {
        removeComments: true, //注释
        collapseWhitespace: true, //空白
        //removeAttributeQuotes: true, //属性引号
        quoteCharacter: '"',
        keepClosingSlash: true, //
    },
    excludeTmplFolders: excludeTmplFolders,
    onlyAllows: onlyAllows,
    prefix: 'mp-',
    snippets: {
        loading: '<div class="loading"><span></span></div>'
    },
    atAttrProcessor: function(name, tmpl, info) {
        if (info.prop) {
            var cond = tmpl.replace(/<%=([\s\S]+?)%>/g, '$1');
            return '<%if(' + cond + '){%>' + name + '<%}%>';
        }
        if (info.partial) {
            return tmpl;
        }
        return name + '="' + tmpl + '"';
    },
    tmplCommand: /<%[\s\S]+?%>/g,
    compressTmplCommand: function(tmpl) {
        var stores = {},
            idx = 1,
            key = '&\u001e';
        //下面这行是把压缩模板命令，删除可能存在的空格
        tmpl = tmpl.replace(/<%(=)?([\s\S]*?)%>/g, function(m, oper, content) {
            return '<%' + (oper ? '=' : '') + content.trim().replace(/\s*([,\(\)\{\}])\s*/g, '$1') + '%>';
        });
        //存储非输出命令(控制命令)
        tmpl = tmpl.replace(/<%[^=][\s\S]*?%>\s*/g, function(m, k) {
            k = key + (idx++) + key; //占位符
            stores[k] = m; //存储
            return k;
        });
        //把多个连续存控制命令做压缩
        tmpl = tmpl.replace(/(?:&\u001e\d+&\u001e){2,}/g, function(m) {
            m = m.replace(/&\u001e\d+&\u001e/g, function(n) {
                return stores[n];
            }); //命令还原
            return m.replace(/%>\s*<%/g, ';').replace(/([\{\}]);/g, '$1'); //删除中间的%><%及分号
        });
        //console.log(tmpl);
        tmpl = tmpl.replace(/&\u001e\d+&\u001e/g, function(n) { //其它命令还原
            //console.log(n,stores[n]);
            return stores[n];
        });
        //console.log(tmpl);
        return tmpl;
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
    combineTool.build();
    gulp.src(buildFolder + '/**/*.js')
        .pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }))
        .pipe(gulp.dest(buildFolder));

    gulp.src(buildFolder + '/**/*.css')
        .pipe(cssnano({
            safe: true
        }))
        .pipe(gulp.dest(buildFolder));
});