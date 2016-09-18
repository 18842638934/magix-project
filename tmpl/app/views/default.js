/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Router = Magix.Router;
Magix.applyStyle('@default.css');
var ShrinkCSS = '@./partials/header-sidebar.css:shrink';
module.exports = Magix.View.extend({
    tmpl: '@default.html',
    tmplData: '@default.html:data',
    ctor: function() {
        var me = this;
        me.observe(null, true);
        $('body').append('<div id="tester" />');
        me.owner.mountVframe('tester','app/views/home/index');
    },
    render: function() {
        console.log(this.id);
        var me = this;
        var loc = Router.parse();
        me.$updater.set({
            mainView: 'app/views' + loc.path
        }).digest();
    },
    resize: function() {
        var main = $('#inmain');
        var left = $('#inmain').hasClass(ShrinkCSS) ? 200 : 0;
        main.css({
            width: $(window).width() - left
        });
    },
    'resizeMain<toggleSidebar>': function(e) {
        this.resize();
    },
    '$win<resize>': function() {
        this.resize();
    }
});