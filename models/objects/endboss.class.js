class Endboss extends MovableObject {
    isAlert = false;
    isAttack = false;
    isHurt = false;
    isDead = false;
    chickenBossAlert_sound = new Audio('./audio/danger.mp3');
    chickenBossHurt_sound = new Audio('./audio/roar.wav');
    chickenBossDead_sound = new Audio('./audio/win.mp3');

    imagesWalking = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    imagesAlert = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imagesAttack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'

    ];

    imagesHurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    imagesDead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];




    constructor() {
        super(3500, 80, 200, 400, false);
        this.loadImage(this.imagesWalking[1]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.endbossAlert();
        this.endbossAttack();
        this.endbossHurt();
        this.endbossDead();

        this.speed = 1;
        this.offset = {
            top: 30,
            left: 20,
            right: 20,
            bottom: 30
        };
    }


    /**
    * Triggers the end boss alert animation and sound when the character is within a certain distance.  
    */
    endbossAlert() {
        this.chickenBossAlert_sound.pause();
        setInterval(() => {
            const otherObject = world.character;
            const distance = Math.abs(this.x - otherObject.x);

            if (distance < 400 && !this.isAlert) {
                this.playAnimation(this.imagesAlert);
                if (soundOn) {
                    this.chickenBossAlert_sound.play();
                }
            }
        }, 200);
    }


    /**
    * Triggers the end boss attack animation and movement when the character is within a certain distance.
    */
    endbossAttack() {
        setInterval(() => {
            const otherObject = world.character;
            const distance = Math.abs(this.x - otherObject.x);

            if (distance < 300 && !this.isAttack) {
                this.playAnimation(this.imagesAttack);
                this.x -= 20;
            }
        }, 200);
    }


    /**
    * Triggers the end boss hurt animation and movement when it is hurt.
    */
    endbossHurt() {
        this.chickenBossHurt_sound.pause();
        setInterval(() => {
            if (this.isHurt) {
                this.playAnimation(this.imagesHurt);
                this.x -= 5;
                this.isAlert = true;
                this.isAttack = true;
                if (soundOn) {
                    this.chickenBossHurt_sound.play();
                }
            }
        }, 200);
    }


    /**
    * Triggers the end boss dead animation and movement when it is dead.
    */
    endbossDead() {
        this.chickenBossDead_sound.pause();
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.imagesDead);
                this.x -= 0.01;
                this.endAnimation();
            }
        }, 200);
    }


    /**
    * Triggers the end of the animation and displays the game over screen.
    */
    endAnimation() {
        if (soundOn) {
            this.chickenBossDead_sound.play();
        }
        setTimeout(() => {
            document.getElementById('gameOver').classList.remove('d-none');
            gameAudio.pause();
        }, 800);
    }
}