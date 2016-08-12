define('app/views/coms/table',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: "<table class=\"table\"><thead><tr><th>xx</th><th>xx</th><th>xx</th><th>operator</th></tr></thead><tbody><tr><td>xxx</td><td>xxx</td><td>xxx</td><td><div class=\"operation\">xx</div></td></tr><tr><td>xxx</td><td>xxx</td><td>xxx</td><td><div class=\"operation\">xx</div></td></tr><tr><td colspan=\"4\" class=\"table-child-td\"><table class=\"table-child\"><thead><tr><th>xx</th><th>xx</th><th>xx</th><th>operator</th></tr></thead><tbody><tr><td>xxx</td><td>xxx</td><td>xxx</td><td><div class=\"operation\">xx</div></td></tr><tr><td>xxx</td><td>xxx</td><td>xxx</td><td><div class=\"operation\">xx</div></td></tr><tr><td>xxx</td><td>xxx</td><td>xxx</td><td><div class=\"operation\">xx</div></td></tr></tbody></table></td></tr><tr><td>xxx</td><td>xxx</td><td>xxx</td><td><div class=\"operation\">xx</div></td></tr></tbody><tfoot mx-mousedown=\"drag()\"><tr><td colspan=\"4\">xxx</td></tr></tfoot></table>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});
});