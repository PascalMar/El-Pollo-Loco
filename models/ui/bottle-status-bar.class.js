class BottleStatusBar extends DrawableObject {

    imagesBottle = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    percent = 0;

    constructor() {
        super(20, 80, 200, 50);
        this.loadImages(this.imagesBottle);
        this.setPercentBottle(0);
    }

    /**
    * Sets the percentage of the bottle.
    * @param {number} percent - The percentage of the bottle (0 to 5).
    */
    setPercentBottle(percent) {
        this.percent = percent;
        let path = this.imagesBottle[this.resolveImageIndex()];
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