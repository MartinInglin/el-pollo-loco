class Statusbars extends DrawableObject {
  height = 65;
  width = 250;
  intervalsStatusbar = [];

  setStoppableInterval(func, time) {
    let id = setInterval(() => func.apply(this), time);
    this.intervalsStatusbar.push(id);
  }  
}
