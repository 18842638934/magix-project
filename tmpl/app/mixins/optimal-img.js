let supportWebp;
let canvas = document.createElement('canvas');
try {
    supportWebp = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
} catch (ignore) {

}
module.exports = {
    ctor() {
        this.updater.set({
            optimalImg: function(src, q) {
                if (!q) q = 60;
                let r = src + '_q' + q;
                if (supportWebp) {
                    r += '_.webp';
                }
                return r;
            }
        });
    }
};