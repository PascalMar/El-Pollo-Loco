class DrawableObject {
    constructor(x, y, width, height, debug) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.debug = debug || false;

        this.img;
        this.imageCache = {};
        this.currentImage = 0;
    }

    /**
    * Loads an image from the specified path.
    * @param {string} path - The path to the image file.
    */
    loadImage(path) {
        try {
            this.img = new Image();
            this.img.src = path;
        } catch (e) {            
        }

    }

    /**
    * Loads multiple images from the specified array of paths.
    * @param {string[]} arr - The array of image paths to be loaded.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
   * Draws the image on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

            if (this.debug) {
                ctx.beginPath();
                ctx.lineWidth = '3';
                ctx.strokeStyle = 'red';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        } catch (e) {
            console.warn('Error loading Image', e);
            console.log('Could not load Image', this.img.src);
        }
    }
}