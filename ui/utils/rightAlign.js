function rightAlign(item, width) {
    let buffer = '';

    while (item.length < width) {
        buffer += ' ';
        width--;
    }

    return buffer + item;
}

module.exports = rightAlign;