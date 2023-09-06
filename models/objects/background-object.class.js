class Background extends MovableObject {
    constructor(imagePath, x, y) {
        super(x, y, 720, 420, false);
        this.loadImage(imagePath);
    }
}