class Coins extends MovableObject {
    images = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];

    constructor() {
        super(200 + Math.random() * 2500, 120 + Math.random() * 200, 110, 110, false);

        this.loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.images);
        this.imgAnimate()

        this.offset = {
            top: 30,
            left: 30,
            right: 30,
            bottom: 30
        };
    }

    /**
    * Animates the image by continuously playing the animation. 
    */
    imgAnimate() {
        setInterval(() => {
            this.playAnimation(this.images);
        }, 500)
    }
}