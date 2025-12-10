const { File } = require('node:buffer');

if (!globalThis.File) {
    globalThis.File = File;
}

if (!String.prototype.toWellFormed) {
    String.prototype.toWellFormed = function toWellFormed() {
        var str = this;
        return str.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '\uFFFD');
    }
}
