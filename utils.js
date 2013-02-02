function setHTML(container, content) {
    document.getElementById(container).innerHTML = content;
}

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
