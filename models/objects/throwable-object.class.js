class ThowableObject extends MovableObject {
    isBottleSplash = false;
    stopToMoveBottle = false;
    otherDirection = false;

    imagesBottleRotation = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    imageBottleSplash = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirection) {
        super(x, y, 60, 100, false);
        this.isHurtedEndboss = false;
        this.loadImage('/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.imagesBottleRotation);
        this.loadImages(this.imageBottleSplash);
        this.throw(otherDirection);       
    }

    /**
    * Throws the object. 
    */
    throw(otherDirection) {
        this.speedy = 10;
        this.applyGravity();

        setInterval(() => {
            if (!this.stopToMoveBottle && otherDirection ) {
                this.x -= 4;
            } else {
                this.x += 4;
            }
        }, 10);
    }

    draw(ctx) {
        super.draw(ctx);

        if (!this.isBottleSplash) {
            this.playAnimation(this.imagesBottleRotation);

        } else if (this.isBottleSplash) {
            this.playAnimation(this.imageBottleSplash);
            this.x += 0.001;
            setTimeout(() => {
                this.isBottleSplash = false;
                this.stopToMoveBottle = true;
                this.y = 800;
            }, 200);
        }
    }
}