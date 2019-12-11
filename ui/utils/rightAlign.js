function rightAlign(item, width) {
    let buffer = '';

    while (item.length < width) { // don't hard code this either
        buffer += ' ';
        width--;
    }

    return buffer + item;
}

module.exports = rightAlign;