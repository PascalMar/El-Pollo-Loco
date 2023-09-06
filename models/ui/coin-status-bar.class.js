class CoinsStatusBar extends DrawableObject {

    imagesCoins = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    percent = 0;

    constructor() {
        super(20, 40, 200, 50);
        this.loadImages(this.imagesCoins);
        this.setPercentCoins(0);
    }

    /**
    * Sets the percentage of coins and updates the image accordingly. 
    * @param {number} percent - The percentage of coins (0 to 5).
    */
    setPercentCoins(percent) {
        this.percent = percent;
        let path = this.imagesCoins[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * Resolves the index of the bottle image based on the current percentage. 
    * @returns {number} - The index of the bottle image.
    */
    resolveImageIndex() {
        if (this.percent == 100) {
            return 5;
        } else if (this.percent >= 80) {
            return 4;
        } else if (this.percent >= 60) {
            return 3;
        } else if (this.percent >= 40) {
            return 2;
        } else if (this.percent >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}