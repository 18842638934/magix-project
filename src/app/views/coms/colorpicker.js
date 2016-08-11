define('app/views/coms/colorpicker',['magix','../../../coms/colorpicker/index'],function(require,exports,module){
/*Magix ,Colorpicker */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Colorpicker = require('../../../coms/colorpicker/index');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div style=\"margin:20px\"><button class=\"btn\" mx-click=\"showPicker({dock:'left'})\">测试</button> <button class=\"btn\" style=\"float:right\" mx-click=\"showPicker({dock:'right'})\">测试2</button></div>","subs":[]},
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'showPicker<click>': function(e) {
        e.preventDefault();
        var ipt = e.current;
        Colorpicker.show(this, {
            ownerNodeId: ipt.id || (ipt.id = Magix.guid('cp_')),
            dock: e.params.dock,
            color: ipt.innerHTML,
            picked: function(e) {
                ipt.innerHTML = e.color;
            }
        });
    }
});
});