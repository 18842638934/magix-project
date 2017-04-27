/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@large-img.css');
let Win = $(window);
module.exports = Magix.View.extend({
    tmpl: '@large-img.html',
    init(extra) {
        this.$url = extra.url;
        this.$video = extra.video;
    },
    render() {
        let me = this;
        let maxWidth = Win.width() - 100;
        let img;
        let left = 50;
        if (!me.$video) {
            img = new Image();
            img.src = me.$url;
            if (img && img.width) {
                left = (Win.width() - Math.min(img.width, maxWidth)) / 2;
            }
        }
        me.updater.digest({
            viewId: me.id,
            left: left,
            top: 50,
            maxWidth: maxWidth,
            url: me.$url,
            video: me.$video
        });
        setTimeout(me.wrapAsync(() => {
            $('#body_' + me.id).removeClass('@large-img.css:anim-body');
            $('#mask_' + me.id).removeClass('@large-img.css:anim-mask');
        }), 300);
    },
    'close<click>' () {
        let me = this;
        if (!me.$closing) {
            me.$closing = 1;
            $('#body_' + me.id).addClass('@large-img.css:anim-body-out');
            $('#mask_' + me.id).addClass('@large-img.css:anim-mask-out');
            setTimeout(me.wrapAsync(() => {
                me.owner.unmountVframe();
            }), 200);
        }
    }
}, {
    '$img,video<click>': function(e) {
        let me = this;
        let id = Magix.guid('l_img_');
        $('<div id="' + id + '" />').appendTo(document.body);
        let current = e.eventTarget;
        me.owner.mountVframe(id, '@./large-img', {
            url: current.src,
            video: current.tagName.toLowerCase() == 'video'
        });
    }
});