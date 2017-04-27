/*
    author:xinglie.lkf@alibaba-inc.com
 */

let $ = require('$');
let easeInOut = (timeStart, valueStart, timeEnd, valueEnd) => {
    let s = timeEnd / valueEnd * 2;
    return (1 > s ? Math.pow(s, 3) : (s -= 2) * Math.pow(s, 2) + 2) * valueStart / 2 + timeStart;
};
let shake = (node, count, timeout, valueEnd, valueStart) => {
    let tempCount = count;
    let timer;

    let work = () => {
        if (tempCount >= 0) {
            node.css({
                padding: 0
            });

            if (tempCount % 2 === 0) {
                node.css({
                    paddingLeft: easeInOut(0, valueStart, tempCount, valueEnd)
                });
            } else {
                node.css({
                    paddingRight: easeInOut(0, valueStart, tempCount, valueEnd)
                });
            }
            tempCount--;
            timer = setTimeout(work, timeout);
        } else {
            clearTimeout(timer);
        }
    };
    timer = setTimeout(work, timeout);
};
module.exports = {
    shakeNode(node) {
        shake($(node), 20, 25, 12, 3);
    }
};