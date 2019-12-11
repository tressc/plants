module.exports = {
    fieldConfig: {
        name: 'field',
        xOffset: 2,
        yOffset: 2,
        height: 13,
        width: 22
    },
    cursorConfig: {
        name: 'cursor',
        xOffset: 4,
        yOffset: 2,
        height: 13,
        width: 18
    },
    menuConfig: {
        name: 'menu',
        xOffset: 26,
        yOffset: 5,
        height: 4,
        width: 15,
        menuItems: [
            'character',
            'item',
            'map',
            'save'
            // 'CHARACTER',
            // 'ITEMS',
            // 'MAP',
            // 'SAVE'
        ]
    },
    clockConfig: {
        name: 'clock',
        xOffset: 26,
        yOffset: 2,
        height: 1,
        width: 15
    },
    infoConfig: {
        name: 'info',
        xOffset: 2,
        yOffset: 17,
        height: 3,
        width: 22
    },
    itemsConfig: {
        name: 'items',
        xOffset: 26,
        yOffset: 11,
        height: 9,
        width: 15,
        heldItems: [
            'watering can',
            'scythe',
            'rice seed',
            'mikan seed'
        ]
    }
}