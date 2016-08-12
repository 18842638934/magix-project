/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('@file-uploader.css');
module.exports = Magix.View.extend({
    tmpl: '@file-uploader.html',
    tmplData: '@file-uploader.html:data',
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'range<change>': function(e) {
        console.log(e.value);
    }
});