'#exclude(define,before)';
'@./snippets/sea.js';
'@./snippets/jquery.js';
define('$', function() {
    return jQuery;
});
'@./snippets/magix.js';
(function() {
    var node = document.getElementById('boot');
    var src = node.src.replace('/boot.js', '');
    var Env = {
        cdn: src
    };
    seajs.config({
        debug: true,
        paths: {
            app: Env.cdn
        }
    });
    seajs.use(['magix'], function(Magix) {
        Magix.applyStyle('@scoped.style');
        Magix.boot({
            defaultPath: '/index',
            defaultView: 'app/views/default',
            rootId: 'app',
            error: function(e) {
                setTimeout(function() {
                    throw e;
                }, 0);
            }
        });
    });
})();