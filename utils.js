function setHTML(container, content) {
    document.getElementById(container).innerHTML = content;
}

/*
String.prototype.tokens = function (filter) {
    var s = this;
    return this.split(/\s+/).map(function(word) {
        if (filter !== undefined) {
            return filter.call(s, word);
        }
        return word.toLowerCase();
    });
};

function cleanup(txt) {
    return txt.replace(/(^[\\("']+)|([,:;.?!)"'|\\]+$)/, '').toLowerCase();
}
*/

Array.prototype.diff = function (init) {
    init = init || 0;
    var g = this;
    return this.reduce(function(prev,cur) {
        prev.push(cur - (prev.length > 0 ? g[prev.length-1] : init));
        return prev;
    },[]);
}

Array.prototype.last = function () {
    if (this.length > 0)
        return this[this.length - 1];
    else
        return undefined;
}