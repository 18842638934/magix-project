define('app/views/demos/partials/view-subs-float',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */

var Magix = require('magix');
var Types = [{
    id: 'left',
    text: '左边'
}, {
    id: 'top',
    text: '上边'
}, {
    id: 'right',
    text: '右边'
}, {
    id: 'bottom',
    text: '下边'
}];
module.exports = Magix.View.extend({
    tmpl: "<div class=\"mx-514-form-item\"><div class=\"mx-514-title\">弹出位置</div><div class=\"mx-514-content\" mx-view=\"coms/dropdown/index?list={list}&width={width}\"></div></div>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id,
            list: Types,
            width: 210
        }).digest();
        // me.dropdown('pos_' + me.id, {
        //     list: Types,
        //     width: 210,
        //     picked: function(e) {
        //         console.log(e);
        //         me.renderByType(e.id);
        //     }
        // });
    }
});
});