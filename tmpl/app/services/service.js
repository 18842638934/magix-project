/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
let PreService = require('./preservice');
let ProjectAPI = require('./project');
let sync = (bag, callback) => {
    if (PreService.intervene()) {
        PreService.addService(sync, bag, callback);
    } else {
        let mock = bag.get('mock');
        if (mock) {
            let ctrl = bag.get('ctrl'); //模拟处理
            if (!ctrl) {
                bag.set('url', './tmpl/apis/list2.json');
            } else {
                bag.set('ctrl', '');
            }
        }
        $.ajax({
            url: bag.get('url') + '?r=' + Magix.guid(),
            complete(xhr, text) {
                if (text == 'error') {
                    callback({
                        msg: xhr.statusText
                    });
                } else {
                    let data = $.parseJSON(xhr.responseText);
                    if (data.action) {
                        console.log('need', data.action);
                        PreService.addService(sync, bag, callback);
                        PreService.addTask(data.action);
                    } else {
                        bag.set('data', data);
                        callback();
                    }
                }
            }
        });
    }
};
let Service = Magix.Service.extend(sync);
ProjectAPI(Service);
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
        me.lock(key, () => {
            me.request(key + '_request').save(models, () => {
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
    lock(key, fn) {
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
    unlock(key) {
        let locker = this.$locker;
        if (locker) {
            delete locker[key];
        }
    }
});
module.exports = Service;