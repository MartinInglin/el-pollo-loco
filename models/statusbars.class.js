class Statusbars extends DrawableObject {
  height = 65;
  width = 250;
  intervalsStatusbar = [];

  /**
   * This function sets stoppable Intervals for all statusbars. It stores the IDs into the array "intervalsStatusbar".
   * 
   * @param {function} func - The function that should be executed within this interval.
   * @param {number} time - The time after which the interval is repeated. 
   */
  setStoppableInterval(func, time) {
    let id = setInterval(() => func.apply(this), time);
    this.intervalsStatusbar.push(id);
  }  
}
