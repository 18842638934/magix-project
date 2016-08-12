/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Colorpicker = require('@coms/colorpicker/index');
module.exports = Magix.View.extend({
    tmpl: '@colorpicker.html',
    tmplData: '@colorpicker.html:data',
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