class Chicken extends MovableObject {
    isDead = false;
    chicken_sound = new Audio('./audio/chicken.wav');

    offset = {
        top: 5,
        left: 5,
        right: 5,
        bottom: 5
    };


    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    imageChickenDead = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];


    currentImage = 0;

    constructor() {
        super(200 + Math.random() * 2500, 385, 70, 70, false);
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imageChickenDead);
        this.animate();
        this.imgAnimate();

        this.speed = 0.6 + Math.random() * 0.15;
    }

    /**
    * Animates the image by continuously playing the walking animation or the chicken dead animation. 
    */
    imgAnimate() {        
        setInterval(() => {
            this.chicken_sound.pause();
            if (!this.isDead) {
                this.playAnimation(this.imagesWalking);

            } else if (this.isDead) {
                this.playAnimation(this.imageChickenDead);
                this.endPlayAnimation();
            }
        }, 120)
    }

    /**
    * Animates the character by continuously moving it to the left.
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}