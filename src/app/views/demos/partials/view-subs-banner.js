define('app/views/demos/partials/view-subs-banner',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */

var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: "<div class=\"mp-514-form-item\"><div class=\"mp-514-title\">创意尺寸</div><div class=\"mp-514-content\"><input class=\"input mp-514-w88\"/> X <input class=\"input mp-514-w88\"/></div></div>",
    tmplData: [],
    render: function() {
        var me = this;
        setTimeout(me.wrapAsync(function() {
            me.$updater.digest();
        }), 10000);
    }
});
});