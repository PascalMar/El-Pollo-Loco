class World {
    canvas;
    ctx;
    keyboard;
    camara_x = 0;

    // level
    level = level1;

    // ui
    statusBar = new StatusBar();
    coinsStatusBar = new CoinsStatusBar();
    bottleStatusBar = new BottleStatusBar();
    endbossStatusBar = new EndbossStatusBar();

    // objects
    character = new Character();
    endboss = new Endboss();
    bottle = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle()];
    coins = [new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins(), new Coins()];
    throwableObjects = [];

    // sounds
    coin_sound = new Audio('./audio/coin.wav');
    bottle_sound = new Audio('./audio/bottle1.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

        this.run();
    }

    /**
    Checks if the character can throw objects and performs the throwing action.
    */
    checkThrowObjects() {
        if (this.character.crowdBottle > 0) {
            if (this.keyboard.D && (!this.lastThrowTime || Date.now() - this.lastThrowTime > 500)) {
                let bottle = new ThowableObject(this.character.x + 20, this.character.y + 20, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.character.throwBottle();
                this.bottleStatusBar.setPercentBottle(this.character.crowdBottle);
                this.lastThrowTime = Date.now();
            }
        }
    }

    /**
    Checks for collisions between the character and enemies, and handles the corresponding actions.
    */
    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead && this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height > enemy.y && this.character.isAboveGround() && !this.character.isHurt() && this.character.speedy < 0) {
                    enemy.isDead = true;
                } else {
                    this.character.hit();
                    this.statusBar.setPercent(this.character.energy);
                }
            }
        });
    }

    /**
    Checks for collisions between the throwable objects (bottles) and enemies, and handles the corresponding actions.
    */
    checkCollisionsBottleChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    enemy.isDead = true;
                    bottle.isBottleSplash = true;
                    bottle.stopToMoveBottle = true;
                }
            });
        });
    }

    /**
    Checks for collisions between the throwable objects (bottles) and the floor, and handles the corresponding actions.
    */
    checkCollisionsBottleFloor() {
        this.throwableObjects.forEach((bottle) => {
            setTimeout(() => {
                bottle.isBottleSplash = true;
                bottle.stopToMoveBottle = true;
            }, 1200);
        });
    }

    /**
    Checks for collisions between the throwable objects (bottles) and the end boss, and handles the corresponding actions.
    */
    checkCollisionsBottleEndboss() {
        this.throwableObjects.forEach((bottle, index) => {
            if (bottle.isColliding(this.endboss) && !bottle.isHurtedEndboss) {
                bottle.isHurtedEndboss = true;
                bottle.isBottleSplash = true;
                bottle.stopToMoveBottle = true;
                this.hitInformationEndboss();
                if (this.endboss.energyEndboss <= 60) {
                    this.endboss.isHurt = true;
                }
                if (this.endboss.energyEndboss <= 0) {
                    this.endboss.isDead = true;
                }
            }
        });
    }

    /**
    Performs the actions when the end boss is hit by a throwable object.
    Updates the end boss's energy and the corresponding status bar.
    */
    hitInformationEndboss() {
        this.endboss.hitEndboss();
        this.endbossStatusBar.setPercent(this.endboss.energyEndboss);
    }

    /**
    Checks for collisions between the character and the end boss.
    If a collision is detected, it reduces the character's energy and updates the character's energy status bar.
    */
    checkCollisionsEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.hit();
            this.statusBar.setPercent(this.character.energy);
        }
    }

    /**
    Checks for collisions between the character and bottles.
    If a collision is detected, it push/delete the bottle in statusbar
    */
    checkCollisionsBottle() {
        this.bottle_sound.pause();
        this.bottle.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.touchBottle();
                this.bottleStatusBar.setPercentBottle(this.character.crowdBottle);
                this.ctx.clearRect(bottle.x, bottle.y, bottle.width, bottle.height);
                this.bottle.splice(index, 1);
                if (soundOn) {
                    this.bottle_sound.play();
                }
            }
        });
    }

    /**
    Checks for collisions between the character and coins.
    If a collision is detected, it push/delete the bottle in statusbar
    */
    checkCollisionsCoins() {
        this.coin_sound.pause();
        this.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.character.touchCoins();
                this.coinsStatusBar.setPercentCoins(this.character.crowdCoins);
                this.ctx.clearRect(coins.x, coins.y, coins.width, coins.height);
                this.coins.splice(index, 1);
                if (soundOn) {
                    this.coin_sound.play();
                }
            }
        });
    }


    update() {
        this.checkCollisionsBottleChicken();
        this.checkCollisionsBottleEndboss()
        this.checkCollisionsEnemies();
        this.checkCollisionsBottle();
        this.checkCollisionsCoins();
        this.checkCollisionsEndboss();
        this.checkThrowObjects();
        this.checkCollisionsBottleFloor();
    }

    run() {
        this.update();
        setTimeout(() => {
            this.run();
        }, 1000 / 60);
    }

    /**
   Puts the world variable in the class
   */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.endbossStatusBar.world = this;
    }

    /**
    Draws all images
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camara_x, 0);

        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camara_x, 0);
        // --Space for fixed Objects
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsStatusBar);
        this.addToMap(this.bottleStatusBar);

        this.ctx.translate(this.camara_x, 0);


        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottle);
        this.addToMap(this.endboss);
        this.addToMap(this.endbossStatusBar);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camara_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    Adds objects to the map
    @param {Array} objects - An array of objects to be added to the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
    Flips image of Character when moving left
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    Flips image of Character back when moving right
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}