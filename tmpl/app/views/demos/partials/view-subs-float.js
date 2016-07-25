/*
    author:xinglie.lkf@taobao.com
 */
'ref@../view-subs.css';
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
    tmpl: '@view-subs-float.html',
    tmplData: '@view-subs-float.html:data',
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