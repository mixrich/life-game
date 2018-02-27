function Cell(x, y, isActiveDefault) {

    /* Cell coords */
    let _coords = {x, y};

    /* is Cell Active/Live ? */
    let _isActive = !!isActiveDefault;

    /* Neighbours for current Cell */
    let _neighbours = [];

    /* 
        Calculate Neighbours for current Cell.

        The grid is "Infinite". If Cell doesn't has neighbour at one side,
        it takes neighbour from opposite side of grid.
    */
    const getNeigh = () => {
        const {x, y} = _coords;
        return cells.filter(cell => {
            const cellCoords = cell.getCoords();
            var xMin = x - 1;
            var xMax = x + 1;

            var yMin = y - 1;
            var yMax = y + 1;

            if (xMax >= n && cellCoords.x === 0) {
                xMax = 0;
                xMin = 0;
            }

            if (yMax >= n && cellCoords.y === 0) {
                yMax = 0;
                yMin = 0;
            }

            if (xMin < 0 && cellCoords.x === n - 1) {
                xMax = n;
                xMin = n-1;
            }

            if (yMin < 0 && cellCoords.y === n - 1) {
                yMax = n;
                yMin = n-1;
            }
            

            var isByX = cellCoords.x <= xMax && cellCoords.x >= xMin;
            var isByY = cellCoords.y <= yMax && cellCoords.y >= yMin;

            return isByX && isByY && cell !== this;
        })
    }

    this.init = () => {
        _neighbours = getNeigh();
    }

    this.setCoords = (coords) => {
        _coords = Object.assign(_coords, coords);
    }

    this.getCoords = () => {
        return {..._coords};
    }

    this.setActive = (isActive) => {
        _isActive = Boolean(isActive);
    }

    this.isActive = () => {
        return _isActive;
    }

    this.toggleActive = () => {
        _isActive = !_isActive;
        return _isActive;
    }

    this.getActiveForNextStep = () => {
        const activeNeighboursCount = _neighbours.reduce((acc, cell) => {
            if (cell.isActive()) acc++;
            return acc;    
        }, 0);
        
        var isLive = this.isActive() ? (activeNeighboursCount >=2 && activeNeighboursCount <= 3) : activeNeighboursCount === 3;
        
        return isLive;
    }
}