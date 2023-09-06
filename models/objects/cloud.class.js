class Cloud extends MovableObject {

    constructor(ImagePath) {
        super(100 + Math.random() * 2700, 45, 300, 200, false);
        this.loadImage(ImagePath);
        this.animate()

        this.speed = 0.15;
    }

    /**
    * Animates the cloud by continuously moving it to the left.
    */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}