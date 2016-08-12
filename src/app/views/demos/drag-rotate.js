define('app/views/demos/drag-rotate',['magix','../../../coms/dragdrop/index'],function(require,exports,module){
/*Magix ,DD */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var DD = require('../../../coms/dragdrop/index');
Magix.applyStyle('mx-324',".mx-324-item{width:200px;height:200px;background:#666;margin:40px}");
var ToDegree = function(angle) {
    var degree = angle * 180 / Math.PI;
    degree = Math.round(degree * 100) / 100;
    return degree;
};
module.exports = Magix.View.extend({
    tmpl: "<div class=\"mx-324-item\" mx-mousedown=\"startDrag()\">ROTEAE</div>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'startDrag<mousedown>': function(e) {
        var cx = 329,
            cy = 187;
        var node = e.current;
        var start = Math.atan2(e.pageY - cy, e.pageX - cx);
        start = ToDegree(start);
        DD.begin(node, function(e) {
            var ox = e.pageX - cx,
                oy = e.pageY - cy;
            var angle = Math.atan2(oy, ox);
            var degree = ToDegree(angle) - start;
            console.log(degree);
            //var angle1 = Math.atan(ox / oy) / (2 * Math.PI) * 360;
            node.style.transform = 'rotate(' + degree + 'deg)';

            //console.log(angle, degree, angle1);
        });
    }
});
});