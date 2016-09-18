define('app/views/default',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Router = Magix.Router;
Magix.applyStyle('mx-edf',".mx-edf-inmain{padding-top:60px}");
var ShrinkCSS = 'mx-286-shrink';
module.exports = Magix.View.extend({
    tmpl: "<div mx-view=\"app/views/partials/header\" mx-togglesidebar=\"resizeMain()\"></div><div class=\"mx-edf-inmain\" id=\"inmain\"><div mx-guid=\"x05a1-\u001f\" mx-view=\"<%=mainView%>\"><div class=\"loading\"><span></span></div></div></div>",
    tmplData: [{"keys":["mainView"],"selector":"div[mx-guid=\"x05a1-\u001f\"]","view":"<%=mainView%>"}],
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
});