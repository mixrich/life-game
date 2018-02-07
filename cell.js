function Cell(x, y, isLife) {
    this.x = x;
    this.y = y;
    this.isLife = !!isLife;
    
    this.getNeigh = () => {
        return this.neig = cells.filter(cell => {

            var xMin = this.x - 1;
            var xMax = this.x + 1;

            var yMin = this.y - 1;
            var yMax = this.y + 1;

            if (xMax >= n && cell.x === 0) {
                xMax = 0;
                xMin = 0;
            }

            if (yMax >= n && cell.y === 0) {
                yMax = 0;
                yMin = 0;
            }

            if (xMin < 0 && cell.x === n - 1) {
                xMax = n;
                xMin = n-1;
            }

            if (yMin < 0 && cell.y === n - 1) {
                yMax = n;
                yMin = n-1;
            }
            

            var isByX = cell.x <= xMax && cell.x >= xMin;
            var isByY = cell.y <= yMax && cell.y >= yMin;

            return isByX && isByY && cell !== this;
        })
    }

    this.getStep = () => {
        this.getNeigh();
        var lives = this.neig.filter(cell => cell.isLife);
        var livesCount = lives.length;
        var isLive = this.isLife ? (livesCount >=2 && livesCount <= 3) : livesCount === 3;
        return isLive;
    }
}