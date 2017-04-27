/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
let Service = Magix.Service.extend(function(bag, callback) {
    $.ajax({
        url: bag.get('url') + '?r=' + Magix.guid(),
        complete: function(xhr, text) {
            if (text == 'error') {
                callback({
                    msg: xhr.statusText
                });
            } else {
                //console.log(xhr.responseText);
                bag.set('data', $.parseJSON(xhr.responseText));
                callback();
            }
        }
    });
});
'@./project.js';
Magix.mix(Service, {
    ctor() {
        let me = this;
        me.on('rendercall', () => { //render方法被调用时，清除locker信息
            delete me.$locker;
        });
    },
    /**
     * 发送请求
     * @param  {String} key 请求的key，相同key值的会自动取消上一次的请求
     * @return {Request}
     */
    request(key) {
        key = key || Magix.guid('r');
        let r = new Service();
        this.capture(key, r, true);
        return r;
    },
    /**
     * 从服务器获取数据
     * @param  {Array} models meta信息数组
     * @param  {Function} callback 回调
     */
    fetch(models, callback) {
        let r = this.request();
        r.all(models, callback);
    },
    /**
     * 保存数据到服务器
     * 默认保存时同样的数据不能多次提交
     * @param  {Array} models meta信息数组
     * @param  {Function} callback
     */
    save(models, callback) {
        let me = this;
        let key = JSON.stringify(models);
        me.lock(key, function() {
            me.request(key + '_request').save(models, function() {
                me.unlock(key);
                callback.apply(me, arguments);
            });
        });
    },
    /**
     * 锁定方法调用，在解锁前不能调用第二次，常用于反复提交
     * @param  {String} key 锁定的key
     * @param  {Function} fn 回调方法
     */
    lock: function(key, fn) {
        let me = this;
        if (!me.$locker) me.$locker = {};
        let locker = me.$locker;
        if (!locker[key]) {
            locker[key] = fn;
            fn();
        }
    },
    /**
     * 解锁
     * @param  {String} key 锁定的key
     */
    unlock: function(key) {
        let locker = this.$locker;
        if (locker) {
            delete locker[key];
        }
    }
});
module.exports = Service;