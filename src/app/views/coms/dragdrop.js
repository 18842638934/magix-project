define('app/views/coms/dragdrop',['magix','../../../coms/dragdrop/izone'],function(require,exports,module){
/*Magix ,Zone */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mp-b74',".mp-b74-dragdrop{margin:50px;overflow:auto;width:105px;float:left;background:#aaa;min-height:100px;max-height:200px}.mp-b74-dragdrop li{width:100px;height:100px;background:#eee;line-height:100px;text-align:center;margin:1px;float:left;cursor:default}");
var Zone = require('../../../coms/dragdrop/izone');
module.exports = Magix.View.extend({
    tmpl: "<ul class=\"mp-b74-dragdrop clearfix\" id=\"dd_<%=id%>\"><li>a</li><li>b</li><li>c</li><li>d</li></ul><ul class=\"mp-b74-dragdrop clearfix dd2\" id=\"dd2_<%=id%>\"><li>1</li><li>2</li><li>3</li><li>4</li></ul><ul class=\"mp-b74-dragdrop dd3 clearfix\" id=\"dd3_<%=id%>\"></ul>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
        //var dragNode;
        var zone = new Zone({
            anchorPosition: Zone.ANCHOR_HORIZONTAL
        });
        zone.addZone('#dd_' + me.id);
        zone.addZone('#dd2_' + me.id);
        zone.addZone('#dd3_' + me.id);
        // zone.on('dragstart', function(e) {
        //     console.log(e);
        //     dragNode = e.child;
        // });
        // zone.on('hoverchildchanged', function(e) {
        //     console.log(e);
        // });
        // zone.on('hoverzonechanged', function(e) {
        //     console.log(e);
        // });
        // zone.on('hoverchildplacechanged', function(e) {
        //     console.log(e.child, e.position, e.side);
        // });
        // zone.on('dragend', function(e) {
        //     console.log('dragNode', dragNode, 'dropNode', e.child);
        // });
        console.log(zone);
        me.capture('zone', zone);
    }
});
});