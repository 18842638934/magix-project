define("app/views/mixins/fx",["magix","../../mixins/fx"],function(t,i,n){var u=t("magix"),s=t("../../mixins/fx");u.applyStyle("p30",""),n.exports=u.View.extend({tmpl:{html:'<h3>基础动效mixin</h3><div mx-guid="g0" class="p16-716">1</div><button type="button" class="pf0-btn pf0-046 p16-716" mx-click="up()">点击总数增加100</button>',subs:[{s:"1",keys:["count"],tmpl:"总数：<%=$$.count%>",path:'div[mx-guid="g0"]'}]},mixins:[s],render:function(){this.updater.digest({count:0})},"up<click>":function(){var t=this.updater,i=t.get("count");this.getFX().run(500,function(n){var u=0|n(i,i+100);t.digest({count:u})})}})});