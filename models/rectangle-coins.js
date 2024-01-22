class RectangleCoin {
  coin;
  x;
  y;
  width;
  height;
  intervalIdsRectangleCoin = [];

  constructor(coin) {
    this.coin = coin;
    this.x = this.coin.x + 25;
    this.y = this.coin.y + 25;
    this.height = this.coin.height - 50;
    this.width = this.coin.width - 50;
  }

  stopIntervals() {
    this.intervalIdsRectangleCoin.forEach(clearInterval);
  }
}
