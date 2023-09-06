class Chickensmall extends MovableObject {
    isDead = false;
    chicken_sound = new Audio('./audio/chicken.wav');
    randomNumber;

    imagesWalking = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png'
    ];

    imageChickenDead = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    currentImage = 0;

    constructor() {
        super(200 + Math.random() * 2500, 403, 50, 50, false);
        this.loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.randomNumber = Math.random() * 2500;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imageChickenDead);
        this.animate();
        this.imgAnimate();



        this.speed = 0.15 + Math.random() * 0.15;
        this.offset = {
            top: 5,
            left: 5,
            right: 5,
            bottom: 5
        };
    }

    /**
    * Animates the image by continuously playing the walking animation or the chicken dead animation. 
    */
    imgAnimate() {
        this.chicken_sound.pause();
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.imagesWalking);
            } else if (this.isDead) {
                this.playAnimation(this.imageChickenDead);
                this.endPlayAnimation();
            }
        }, 100);
    }


    /**
    * Animates the character by continuously moving it to the left.
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}