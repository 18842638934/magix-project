define("app/views/sundries/leavepage",["magix","../../mixins/form","../../mixins/dialog"],function(e,i,t){var a=e("magix");a.applyStyle("p0d",".p0d-e75{width:900px}");var l=e("../../mixins/form"),d=e("../../mixins/dialog"),s=[{id:1,text:"分类1"},{id:2,text:"分类2"},{id:3,text:"分类3"},{id:4,text:"分类4"},{id:5,text:"分类5"},{id:6,text:"分类6"},{id:7,text:"分类7"},{id:8,text:"分类8"},{id:9,text:"分类9"},{id:10,text:"分类10"},{id:11,text:"分类11"},{id:12,text:"分类12"},{id:13,text:"分类13"},{id:14,text:"分类14"},{id:15,text:"分类15"}];t.exports=a.View.extend({tmpl:{html:'<h3>离开提醒</h3><p class="p0d-e75">你可以尝试修改下面的表单，修改后在不点击“保存表单”的情况下，尝试点击导航去别的页面或刷新页面，会有相应的提示，此时你可以点击“保存表单”，然后再点击导航去别的页面或刷新页面，这时候就不会再有提示了。</p><h4 class="p16-716">演示</h4><form mx-guid="g5" mx-view="app/gallery/mx-validation/index" id="form_<%=$$.viewId%>"><div class="p5c-f1c p16-c8d"><label class="p5c-078"><i class="p5c-929">*</i>必填校验：</label><div class="p16-fl"><input mx-guid="g3" class="p5c-dc6" type="text" validator-required="true" value="<%=$$.rValue%>" mx-change="syncValue({p:\'rValue\'})"/></div></div><div class="p5c-f1c p16-c8d"><label class="p5c-078">Taginput：</label><div class="p16-fl"><div mx-guid="g4" class="p5c-dc6" mx-view="app/gallery/mx-taginput/index?list=<%@$$.list2%>&placeholder=%E8%AF%B7%E9%80%89%E6%8B%A9%E5%88%86%E7%B1%BB&textKey=text&valueKey=id" validator-required="true" mx-change="syncValue({p:\'tags\',m:\'showSelected\',a:{}})"></div></div></div><div class="p5c-f1c p16-c8d"><label class="p5c-078">下拉框：</label><div class="p16-fl"><div mx-view="app/gallery/mx-dropdown/index?emptyText=%E4%B8%8B%E6%8B%89%E6%A1%86&width=340" validator-required="true" mx-change="syncValue({p:\'dropdwon\',m:\'showValue\',a:{}})"><item value="a1">text 1</item></div></div></div><div class="p5c-f1c p16-c8d"><label class="p5c-078">日历：</label><div class="p16-fl"><input class="p5c-dc6" type="text" validator-required="true" mx-view="app/gallery/mx-calendar/datepicker" mx-change="syncValue({p:\'date\'})"/></div></div><div class="p5c-f1c p16-c8d"><label class="p5c-078">颜色：</label><div class="p16-fl"><input class="p5c-dc6" type="text" validator-required="true" mx-view="app/gallery/mx-colorpicker/picker" mx-change="syncValue({p:\'color\'})"/></div></div></form><button class="pf0-btn pf0-046" mx-click="save()">保存表单</button>',subs:[{keys:["list2"],path:'div[mx-guid="g4"]',attr:'mx-view="app/gallery/mx-taginput/index?list=<%@$$.list2%>&placeholder=%E8%AF%B7%E9%80%89%E6%8B%A9%E5%88%86%E7%B1%BB&textKey=text&valueKey=id"',attrs:[{n:"mx-view",v:1}]},{keys:["rValue"],path:'input[mx-guid="g3"]',attr:'value="<%=$$.rValue%>"',attrs:[{n:"value",q:1,p:1}]},{keys:["viewId"],path:'form[mx-guid="g5"]',attr:'id="form_<%=$$.viewId%>"',attrs:[{n:"id",p:1}]}]},mixins:[l,d],leaveConfirm:function(e,i,t){this.confirm(e,i,t)},init:function(){var e=this;this.leaveTip("页面有变化且未保存，确认离开吗？",function(){return e.updater.altered()})},render:function(){this.updater.digest({rValue:"test",list2:s,tags:"",date:"",color:"",dropdwon:""}).snapshot()},"save<click>":function(){this.updater.snapshot()}})});