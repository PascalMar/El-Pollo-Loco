class MovableObject extends DrawableObject {
    constructor(x, y, width, height, debug) {
        super(x, y, width, height, debug);

        this.speed = 0.15;
        this.otherDirection = false;
        this.speedy = 0;
        this.acceleration = 1;
        this.energy = 100;
        this.energyEndboss = 100;
        this.crowdCoins = 0;
        this.crowdBottle = 0;
        this.lastHit = 0;
        this.offset = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
    }

    draw(ctx) {
        super.draw(ctx);

        if (this.debug) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }

    /**
    * Applies gravity to the object, simulating vertical movement. 
    */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedy > 0) {
                this.y -= this.speedy;
                this.speedy -= this.acceleration;
            } else {
                this.speedy = 0;
            }
        }, 1000 / 25);
    }

    /**
    * Checks if the object is positioned above the ground.
    * @returns {boolean} `true` if the object is above the ground, `false` otherwise.
    */
    isAboveGround() {
        if (this instanceof ThowableObject) {
            return this.y < 402;
        } else {
            return this.y < 202;
        }
    }

    /**
    * Decreases the energy of the end boss when hit.   
    */
    hitEndboss() {
        this.energyEndboss -= 20;
        if (this.energyEndboss < 0) {
            this.energyEndboss = 0;
        }
    }

    /**
    * Increases the coin count when touched.
    */
    touchCoins() {
        this.crowdCoins += 20;
        if (this.crowdCoins > 100) {
            this.crowdCoins = 100;
        }
    }

    /**
    * Increases bottle count when touched.
    */
    touchBottle() {
        this.crowdBottle += 20;
        if (this.crowdBottle > 100) {
            this.crowdBottle = 100;
        }
    }

    /**
    * Decrease bottle count when touched.
    */
    throwBottle() {
        this.crowdBottle -= 20;
        if (this.crowdBottle < 0) {
            this.crowdBottle = 0;
        }
    }

    /**
    * Ends the play animation for the object.
    */
    endPlayAnimation() {
        if (soundOn) {
            this.chicken_sound.play();
        }
        this.y = 410;
        this.speed = 0;
        setTimeout(() => {
            this.width = 0;
            this.height = 0;
            this.y = 900;
        }, 500);
        setTimeout(() => {
            this.isDead = false;
        }, 800);
    }

    /**
    * Decreases the energy when hit.
    */
    hit() {
        if (this.isHurt()) return;
        this.energy -= 20;       
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Checks if the character is hurt
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s 
        return timePassed < 1;
    }

    /**
    * Checks if the character is dead
    */
    isDead() {
        return this.energy === 0;
    }

    /**
    * Checks if the object is colliding with another object. 
    * @param {Object} mo - The other object to check collision with. 
    */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
    * Plays an animation with the given images. 
    * @param {string[]} images - An array of image paths for the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Moves the object to the right
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Moves the object to the left
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Makes the object jump
    */
    jump() {
        this.speedy = 14;
    }
}