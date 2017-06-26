//#exclude(define);
'@./app/snippets/sea.js';
'@./app/snippets/jquery.js';
define('$', () => {
    return jQuery;
});
'@./app/snippets/magix.js';
(() => {
    let node = document.getElementById('boot');
    let src = node.src.replace('/boot.js', '');
    let Env = {
        cdn: src
    };
    seajs.config({
        debug: true,
        paths: {
            app: Env.cdn + '/app'
        }
    });
    seajs.use(['magix'], (Magix) => {
        Magix.applyStyle('@scoped.style');
        Magix.boot({
            defaultPath: '/index',
            defaultView: 'app/views/default',
            rootId: 'app',
            error: (e) => {
                setTimeout(() => {
                    throw e;
                }, 0);
            }
        });
    });
})();