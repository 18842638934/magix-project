define("app/gallery/mx-calendar/datepicker",["magix","$","../mx-monitor/index"],function(e,t,i){var n=e("magix"),o=e("$"),a=n.Vframe,d=e("../mx-monitor/index");i.exports=n.View.extend({init:function(e){var t=this;t.$extra=e,d.setup();var i=o("#"+t.id),n=function(){t.show()};t.on("destroy",function(){d.teardown(),o("#dpcnt_"+t.id).remove(),i.off("click",n)}),i.on("click",n),t.$ownerNode=i},inside:function(e){var t=this;return n.inside(e,t.id)||n.inside(e,"dpcnt_"+t.id)},update:function(e){var t=this;a.get("dpcnt_"+t.id).invoke("update",[e])},render:function(){var e=this,t="dpcnt_"+e.id;o(e.wrapEvent('<div style="position:absolute;display:none;z-index:10" mx-change="pickDate()"></div>')).attr("id",t).insertAfter(e.$ownerNode),e.$extra.selected||(e.$extra.selected=e.$ownerNode.val())},show:function(){var e=this;if(!e.$shown){var t=o("#dpcnt_"+e.id),i=e.$ownerNode;e.$shown=!0,d.add(e),e.$rendered||(e.$rendered=!0,e.owner.mountVframe("dpcnt_"+e.id,"app/gallery/mx-calendar/index"),e.update(e.$extra)),t.show();var n=i.offset(),a=void 0,r=void 0;switch(e.$extra.placement){case"top":r=n.top-t.outerHeight()-5;break;default:r=n.top+i.outerHeight()+5}switch(e.$extra.align){case"right":a=n.left+i.outerWidth()-t.outerWidth();break;default:a=n.left}t.offset({left:a,top:r})}},hide:function(){var e=this;if(e.$shown){var t=o("#dpcnt_"+e.id);t.prop("vframe").invoke("toDaysPannel"),e.$shown=!1,t.hide(),d.remove(e)}},"pickDate<change>":function(e){var t=this;e.stopPropagation(),t.$ownerNode.val(e.date).trigger({type:"change",date:e.date}),t.hide()}})});