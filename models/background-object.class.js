class BackgroundObject {

    height = 480;
    width = 720;
    constructor(imagePath, x) {
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
      }
}