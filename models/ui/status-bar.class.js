class StatusBar extends DrawableObject {

    imagesHeard = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percent = 100;

    constructor() {
        super(20, 0, 200, 50);
        this.loadImages(this.imagesHeard);
        this.setPercent(100);
    }

    /**
    Sets the percentage value of the object and updates the image accordingly.
    @param {number} percent - The percentage value to set (0 to 5).
    */
    setPercent(percent) {
        this.percent = percent; // => 0 ... 5
        let path = this.imagesHeard[this.resolveImageIndex()];
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