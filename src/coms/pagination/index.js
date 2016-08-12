define('coms/pagination/index',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Router = Magix.Router;
var $ = require('$');
Magix.applyStyle('mx-886',".mx-886-page-list{text-align:center;float:left}.mx-886-page-item,.mx-886-page-list{height:25px;line-height:25px}.mx-886-page-item{color:#999;font-size:14px;display:inline-block;width:25px;margin-left:2px;vertical-align:text-bottom}.mx-886-page-active{color:#fff;background:#98aedd;border-radius:3px}.mx-886-page-disabled{cursor:not-allowed}");
module.exports = Magix.View.extend({
    tmpl: "<div class=\"mx-886-page-list\" mx-guid=\"x2511-\u001f\">@1-\u001f</div>",
    tmplData: [{"guid":1,"keys":["start","end","index","path","pages"],"tmpl":"<a href=\"#!<%=path%>\" <%if(index==1){%> class=\"mx-886-page-disabled mx-886-page-item\" <%}else{%> mx-click=\"toPrev()\" class=\"mx-886-page-item\" <%}%>>⇦</a><%if(start>1){%><a class=\"mx-886-page-item\" href=\"#!<%=path%>\" mx-click=\"toPage({page:1})\">1</a><%}if(start>2){%><a class=\"mx-886-page-item\">...</a><%}for(var i=start;i<=end;i++){%><a class=\"mx-886-page-item<%if(i==index){%> mx-886-page-active<%}%>\" href=\"#!<%=path%>\" mx-click=\"toPage({page:<%=i%>})\"><%=i%></a><%}if(end+2<=pages){%><a class=\"mx-886-page-item\">...</a><%}if(end<pages){%><a class=\"mx-886-page-item\" href=\"#!<%=path%>\" mx-click=\"toPage({page:<%=pages%>})\"><%=pages%></a><%}%><a href=\"#!<%=path%>\" <%if(index==pages){%> class=\"mx-886-page-disabled mx-886-page-item\" <%}else{%> mx-click=\"toNext()\" class=\"mx-886-page-item\" <%}%>>⇨</a>","selector":"div[mx-guid=\"x2511-\u001f\"]"}],
    ctor: function(extra) {
        var me = this;
        me.$updater.onchanged = function(e) {
            if (e.keys.index) {
                $('#' + me.id).trigger({
                    type: 'change',
                    index: this.get('index')
                });
            }
        };
        me.$extra = extra;
    },
    render: function() {
        var me = this;
        me.update(me.$extra);
    },
    cal: function() {
        var me = this;
        var data = me.$updater;
        var index = data.get('index') | 0;
        var pages = data.get('pages') | 0;
        if (index > pages) index = pages;
        var step = data.get('step') | 0;
        var middle = step / 2 | 0;
        var start = Math.max(1, index - middle);
        var end = Math.min(pages, start + step - 1);
        start = Math.max(1, end - step + 1);
        var offset;
        if (start <= 2) { //=2 +1  =1  +2
            offset = 3 - start;
            if (end + offset < pages) {
                end += offset;
            }
        }
        if (end + 2 > pages) {
            offset = 2 - (pages - end);
            if ((start - offset) > 1) {
                start -= offset;
            }
        }
        if (start == 3) {
            start -= 1;
        }
        if (end + 2 == pages) {
            end += 1;
        }
        data.set({
            index: index,
            start: start,
            end: end
        }).digest();
    },
    update: function(ops) {
        var me = this;
        var pages = Math.ceil((ops.total || 1) / (ops.size || 20));
        var index = ops.index || 1;
        me.$updater.set({
            path: Router.parse().path,
            step: ops.step || 7,
            index: index,
            pages: pages
        });
        me.cal();
    },
    'toPage<click>': function(e) {
        e.preventDefault();
        var me = this;
        me.$updater.set({
            index: e.params.page
        });
        me.cal();
    },
    'toPrev<click>': function(e) {
        e.preventDefault();
        var data = this.$updater;
        var idx = data.get('index');
        data.set({
            index: idx - 1
        });
        this.cal();
    },
    'toNext<click>': function(e) {
        e.preventDefault();
        var data = this.$updater;
        var idx = data.get('index');
        data.set({
            index: idx + 1
        });
        this.cal();
    }
});
});