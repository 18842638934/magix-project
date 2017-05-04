define("app/views/coms/uploader",["magix","../../mixins/gtip"],function(t,d,e){var r=t("magix");r.applyStyle("p38",".p38-e75{width:900px}");var h=t("../../mixins/gtip");e.exports=r.View.extend({tmpl:{html:'<h3>Uploader组件</h3><p>目前仅实现了iframe上传，xhr上传需要再开发</p><h4>配置项</h4><table class="p3a-c06 p3a-042 p38-e75"><thead><tr><th>参数名称</th><th>参数类型</th><th>参数说明</th><th>默认值</th></tr></thead><tbody><tr><td>name</td><td>string</td><td>服务器端接收文件时的名称</td><td>file</td></tr><tr><td>action</td><td>string</td><td>上传地址</td><td></td></tr><tr><td>multiple</td><td>boolean</td><td>是否允许多文件上传</td><td>否</td></tr><tr><td>accept</td><td>string</td><td>选择文件时的类型，参考input[type=file]的accept</td><td></td></tr></tbody></table><h4 class="p16-716">事件</h4><h5>success</h5><table class="p3a-c06 p3a-042 p38-e75"><thead><tr><th>参数名称</th><th>参数类型</th><th>参数说明</th><th>默认值</th></tr></thead><tbody><tr><td>response</td><td>object</td><td>成功时服务器端返回的内容</td><td></td></tr></tbody></table><h5>error</h5><table class="p3a-c06 p3a-042 p38-e75"><thead><tr><th>参数名称</th><th>参数类型</th><th>参数说明</th><th>默认值</th></tr></thead><tbody><tr><td>error</td><td>object</td><td>错误对象</td><td></td></tr></tbody></table><h4 class="p16-716">演示</h4><div class="p16-c8d"><button class="pf0-btn pf0-046" mx-view="app/gallery/mx-uploader/index?action=unfound%2Fpath&name=file1&multiple=true" mx-error="showError()">上传文件</button></div>',subs:[]},mixins:[h],render:function(){this.updater.digest()},"showError<error>":function(t){this.gtipRT(t.error),console.log(t.error)}})});