class DrawableObject {
  imageCache = {};
  x;
  y;
  img;
  height;
  width;

  /**
   * This function is there for loading the first image of an object. It fills the variable img.
   *
   * @param {path} path - Path of an image, for example "img/2_character_pepe/1_idle/idle/I-1.png".
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function loads the array "imageCache" from where the images can be used to display animations.
   *
   * @param {array} array - An array of images to be stored in imagesCache.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
