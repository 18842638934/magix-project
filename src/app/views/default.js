define('app/views/default',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Router = Magix.Router;
var ShrinkCSS = 'mp-286-shrink';
module.exports = Magix.View.extend({
    tmpl: "<div mx-view=\"app/views/partials/header\" mx-togglesidebar=\"resizeMain()\"></div><div class=\"inmain\" id=\"inmain\"><div mx-guid=\"x05a1-\u001f\" mx-view=\"<%=mainView%>\"><div class=\"loading\"><span></span></div></div></div>",
    tmplData: [{"keys":["mainView"],"selector":"div[mx-guid=\"x05a1-\u001f\"]","view":"<%=mainView%>"}],
    ctor: function() {
        var me = this;
        me.observe(null, true);
    },
    render: function() {
        var me = this;
        var loc = Router.parse();
        console.log('xx');
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