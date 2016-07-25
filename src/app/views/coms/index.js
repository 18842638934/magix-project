define('app/views/coms/index',['magix'],function(require,exports,module){
/*Magix*/
/*
    author:xinglie.lkf@taobao.com
 */
var Magix=require('magix');
module.exports=Magix.View.extend({
    tmpl:"常用组件首页",
    render:function(){
        var me=this;
        me.setHTML(me.id,me.tmpl);
    }
});
});