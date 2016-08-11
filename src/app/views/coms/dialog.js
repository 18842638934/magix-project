define('app/views/coms/dialog',['magix','../../../coms/dialog/index'],function(require,exports,module){
/*Magix ,Dialog */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Dialog = require('../../../coms/dialog/index');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div style=\"margin:50px\"><button mx-click=\"alert()\" class=\"btn btn-size30\" style=\"margin-left:20px\">alert</button> <button mx-click=\"confirm()\" class=\"btn btn-size30\" style=\"margin-left:20px\">confirm</button> <button mx-click=\"view()\" class=\"btn btn-size30\" style=\"margin-left:20px\">view</button></div>","subs":[]},
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'alert<click>': function() {
        Dialog.alert(this, 'test');
    },
    'confirm<click>': function() {
        Dialog.confirm(this, 'test');
    },
    'view<click>': function() {
        Dialog.msgbox(this, {
            title: '提示信息view',
            view: 'app/views/coms/popover',
            dock: 'left',
            left: 200,
            top: 200,
            height: 400,
            width: 600
        });
    }
});
});