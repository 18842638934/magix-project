define('app/views/demos/pull-refresh',['magix','$','../../../coms/dragdrop/index'],function(require,exports,module){
/*Magix ,$ ,DD */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var DD = require('../../../coms/dragdrop/index');
Magix.applyStyle('mx-f7e',".mx-f7e-page{width:600px;height:400px;background:#eee;margin:0 auto;overflow:auto;position:relative;margin-top:-40px}.mx-f7e-refresh{height:40px;line-height:40px;width:600px;margin:0 auto;text-align:center}");
module.exports = Magix.View.extend({
    tmpl: {"html":"<div class=\"mx-f7e-page\" mx-mousedown=\"startDrag()\"><div class=\"mx-f7e-refresh\">下拉刷新</div>magix view pull-refresh<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>1</div>","subs":[]},
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'startDrag<mousedown>': function(e) {
        var cnt = $(e.current);
        if (cnt.scrollTop() <= 0) {
            console.log('start');
            var y = e.pageY;
            DD.begin(e.current, function(e) {
                var oy = e.pageY - y;
                oy = 80 * Math.atan(oy / 200);
                if (oy > 40) oy = 40;
                cnt.css({
                    transform: 'translateY(' + oy + 'px)',
                    transitionDuration: '0ms'
                });
            }, function() {
                cnt.css({
                    transform: 'translateY(0)',
                    transitionDuration: '200ms'
                });
            });
        }
    }
});
});