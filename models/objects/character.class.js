class Character extends MovableObject {
    world;

    isIdle = true;
    isIdleLong = false;
    isDeaded = false;
    isMoved = false;


    imagesWalking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesJumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    imagesDead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    imagesHurts = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    imagesStand = ['./img/2_character_pepe/1_idle/idle/I-1.png'];

    imagesIdle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    imagesIdleLong = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'

    ];


    hurt_sound = new Audio('./audio/hurt.ogg');
    dead_sound = new Audio('./audio/dead.wav');


    constructor() {
        super(40, 210, 100, 250, false);
        this.loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurts);
        this.loadImages(this.imagesStand);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesIdleLong);
        this.applyGravity();
        this.animate();

        this.speed = 5;
        this.offset = {
            top: 100,
            left: 10,
            right: 10,
            bottom: 10
        };
    }

    /**
    * Animates the character by continuously updating its position and applying animation.
    */
    animate() {
        // Set interval for moving the character
        setInterval(() => {
            this.isMove();
            this.world.camara_x = -this.x + 100;
        }, 1000 / 60);

        // Set interval for animating the character
        setInterval(() => {
            this.characterAnimation();
        }, 140);
    }


    //condition for move the character right
    isMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isMoved;
    }


    /**
    * Checks if the character should move to the right.
    * @returns {boolean} - True if the character should move to the left, false otherwise.
    */
    isMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600;
    }

    /**
    * Checks if the character should perform a jump.
    * @returns {boolean} - True if the character should perform a jump, false otherwise.
    */
    isJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }


    /**
    * Performs the character movement based on the keyboard inputs. 
    */
    isMove() {
        if (this.isMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.isMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
        }
        if (this.isJump()) {
            this.jump();
        }
    }


    /**
    * Handles the character's death.
    */
    isCharacterDead() {
        this.playAnimation(this.imagesDead);
        this.isMoved = true;
        if (soundOn) {
            this.dead_sound.play();
        }
        setTimeout(() => {
            document.getElementById('gameOver').classList.remove('d-none');
            this.isDeaded = true;
        }, 1500);
        gameAudio.pause();
    }


    /**
    * Handles the character's animation based on its current state.
    */
    characterAnimation() {
        this.hurt_sound.pause();
        this.dead_sound.pause();

        if (this.isDead() && !this.isDeaded) {
            this.isCharacterDead();
            this.isMoved = true;
        } else if (this.isHurt()) {
            this.isHurtShortFunction();
        } else if (this.isAboveGround()) {
            this.isAboveGroundShortFunction();
        } else if (this.isAnimationMovingCharacter()) {
            this.isAnimationMovingCharacterShortFunction();
        } else if (this.isIdle) {
            this.playAnimation(this.imagesIdle);
        }
    }


    /**
    * Handles the short duration animation for the hurt state of the character. 
    */
    isHurtShortFunction() {
        this.isIdleLong = false;
        this.isHurtAnimationCharacter();
    }


    /**
    * Handles the short duration animation for when the character is in the air (above the ground).
    */
    isAboveGroundShortFunction() {
        this.isIdleLong = false;
        this.playAnimation(this.imagesJumping);
    }

    /**
    * Handles the short duration animation for when the character is moving. 
    */
    isAnimationMovingCharacterShortFunction() {
        this.isIdleLong = false;
        this.playAnimation(this.imagesWalking);
    }


    /**
    * Checks if the character is currently in the animation of moving. 
    * @returns {boolean} True if the character is moving, false otherwise.
    */
    isAnimationMovingCharacter() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
    * Plays the animation for the character when it is hurt.
    */
    isHurtAnimationCharacter() {
        this.playAnimation(this.imagesHurts);
        if (soundOn) {
            this.hurt_sound.play();
        }
    }
}