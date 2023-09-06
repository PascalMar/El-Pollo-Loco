class Bottle extends MovableObject {
    world;

    bottleRotation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    constructor() {
        super(200 + Math.random() * 2500, 120 + Math.random() * 200, 110, 110, false);
        this.loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.bottleRotation);
        this.offset = {
            top: 30,
            left: 50,
            right: 50,
            bottom: 20
        };
    }
}