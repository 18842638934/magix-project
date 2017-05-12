/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
let Vframe = Magix.Vframe;
Magix.applyStyle('@index.less');
let ByteLen = (str) => {
    return str.replace(/[^\x00-\xff]/g, 'xl').length;
};
let FindVframe = (start) => {
    let vf;
    while (start && start != document) {
        let id = start.id;
        if (id) {
            vf = Vframe.get(id);
            if (vf) {
                break;
            }
        }
        start = start.parentNode;
    }
    return vf;
};
let Attrs = ['required', 'number', 'length', 'blength', 'range', 'equalto', 'pattern'];
let Rules = {
    required(val, rule) {
        if (rule == 'true') {
            return $.trim(val);
        }
        return true;
    },
    number(val, rule) {
        val = $.trim(val);
        if (val && rule == 'true') {
            if (val.indexOf('.') != val.lastIndexOf('.')) { //多个.
                return false;
            }
            return /^[\d\.]+$/.test(val);
        }
        return true;
    },
    length(val, rule) {
        rule = $.parseJSON(rule);
        if (val.length < rule[0] || val.length > rule[1]) {
            return false;
        }
        return true;
    },
    blength(val, rule) {
        rule = $.parseJSON(rule);
        let len = ByteLen(val);
        if (len < rule[0] || len > rule[1]) {
            return false;
        }
        return true;
    },
    range(val, rule) {
        rule = $.parseJSON(rule);
        val = parseFloat(val);
        if (val < rule[0] || val > rule[1]) {
            return false;
        }
        return true;
    },
    equalto(val, rule) {
        let to = $(rule).val();
        return to == val;
    },
    pattern(val, rule) {
        val = $.trim(val);
        if (val) {
            let reg = new RegExp(rule);
            return reg.test(val);
        }
        return true;
    }
};
let Msgs = {
    required() {
        return '亲，此项必填哦～';
    },
    number() {
        return '亲，请输入数字哦～';
    },
    length(rule) {
        rule = $.parseJSON(rule);
        return '亲，此项长度不能小于' + rule[0] + '，也不能大于' + rule[1] + '哦～';
    },
    blength(rule) {
        rule = $.parseJSON(rule);
        return '亲，此项长度不能小于' + rule[0] + '个字符，也不能大于' + rule[1] + '个字符哦～';
    },
    range(rule) {
        rule = $.parseJSON(rule);
        return '亲，请输入' + rule[0] + '-' + rule[1] + '之间的数字哦～';
    },
    equalto(rule) {
        return '亲，请与' + rule + '填写同样的内容～';
    },
    pattern() {
        return '亲，输入格式有误～';
    }
};
let UI = {
    msg(node, message) {
        let id = node.attr('id');
        if (!id) {
            id = Magix.guid();
            node.attr('id', id);
        }
        let msgId = id + '_msg';
        let msgNode = $('#' + msgId);
        if (!message) {
            msgNode.hide();
            return;
        }
        if (!msgNode.length) {
            node.wrap('<div class="@scoped.style:ib" />');
            node.parent().addClass('@index.less:pr');
            node.before('<div class="@index.less:msg" id="' + msgId + '"/>');
            msgNode = $('#' + msgId);
        }
        msgNode.html(message).show();
        let offset = node.offset();
        let type = node.attr('validator-message-type');
        let left, otop = offset.top;
        if (type == 'outer') {
            msgNode.addClass('@index.less:msg-outer');
            let placement = node.attr('validator-message-placement');
            switch (placement) {
                case 'top':
                    left = offset.left;
                    otop = offset.top - node.outerHeight() - 5;
                    break;
                case 'bottom':
                    left = offset.left;
                    otop = offset.top + node.outerHeight() + 5;
                    break;
                default:
                    left = offset.left + node.outerWidth() + 10;
                    break;
            }
        } else {
            left = offset.left - msgNode.outerWidth() + node.outerWidth() - 1;
            otop += 3;
        }
        let ofst = node.attr('validator-message-offset');
        if (ofst) {
            ofst = $.parseJSON(ofst);
            left += ofst[0];
            otop += ofst[1];
        }
        msgNode.offset({
            left: left,
            top: otop
        });
    },
    hideMsg(node) {
        node = $(node);
        let id = node.attr('id');
        if (!id) {
            id = Magix.guid();
            node.attr('id', id);
        }
        let msgId = id + '_msg';
        let msgNode = $('#' + msgId);
        msgNode.hide();
    },
    ctrl(node, attr) {
        if (attr) {
            node.addClass('@index.less:fail');
            UI.msg(node, node.attr('validator-' + attr + '-message'));
        } else {
            node.removeClass('@index.less:fail');
            UI.msg(node);
        }
    }
};
module.exports = Magix.View.extend({
    one(node, value) {
        node = $(node);
        let me = this;
        let fail = false;
        let owner = node.data('owner');
        if (!owner) {
            node.attr('data-owner', owner = me.id);
        }
        if (owner == me.id) {
            for (let i = 0; i < Attrs.length; i++) {
                let attr = Attrs[i];
                let rule = node.attr('validator-' + attr);
                if (rule) {
                    let r = Rules[attr];
                    if (r) {
                        r = r(value || node.val(), rule);
                        if (!r) {
                            fail = attr;
                            let msg = node.attr('validator-' + attr + '-message');
                            if (!msg) {
                                msg = Msgs[attr](rule);
                                node.attr('validator-' + attr + '-message', msg);
                            }
                            break;
                        }
                    }
                }
            }
            UI.ctrl(node, fail);
        }
        return fail;
    },
    isValid() {
        let me = this;
        let result = true;
        $('#' + me.id + ' input,#' + me.id + ' textarea,#' + me.id + ' [mx-view],#' + me.id + ' [validator]').each((idx, item) => {
            let node = $(item);
            let owner = node.data('owner');
            if (!owner) {
                let vf = FindVframe(item.parentNode);
                if (vf) {
                    node.attr('data-owner', vf.id);
                }
            }
            let one = me.one(item);
            if (one) {
                result = false;
            }
        });
        return result;
    },
    '$div[class="@index.less:msg"]<click>' (e) {
        let node = $(e.eventTarget);
        let type = node.attr('validator-message-type');
        if (type != 'outer') {
            let id = e.eventTarget.id;
            let oNode = Magix.node(id.replace(/_msg$/, ''));
            if (oNode && oNode.tagName == 'INPUT') {
                oNode.select();
                oNode.focus();
            }
        }
    },
    '$input,textarea,[mx-view]<keyup,change,focusin,focusout>' (e) {
        let me = this;
        let target = e.eventTarget;
        if (!e.verify) {
            clearTimeout(target.timer);
            e.verify = me.id;
            if (e.type == 'focusin') {
                UI.hideMsg(target);
            } else {
                target.timer = setTimeout(me.wrapAsync(() => {
                    me.one(target);
                }), 20);
            }
        }
    }
});