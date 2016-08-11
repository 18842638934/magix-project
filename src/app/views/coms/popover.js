define('app/views/coms/popover',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div mx-view=\"coms/popover/index?content=left&dock=left&icon=left\" style=\"margin:50px\"></div><div mx-view=\"coms/popover/index?content=right&dock=right&icon=right\" style=\"margin:50px\"></div><div mx-view=\"coms/popover/index?content=top&dock=top&icon=top\" style=\"margin:50px\"></div><div mx-view=\"coms/popover/index?content=bottom&dock=bottom&icon=bottom\" style=\"margin:50px\"></div>","subs":[]},
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});
});