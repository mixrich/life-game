var cells = [];

var n = 10;


for (var y = 0; y< n; y++) {
    for (var x = 0; x < n; x++) {
        cells.push(new Cell(x, y, false));
    }
}


function drawCells(cells) {
    root.innerHTML = '';
    cells.forEach((cell, index) => {
        var cellDOM = document.createElement('span');
        if (cell.isLife) {
            cellDOM.setAttribute('data-active', 'true');
        }
        cellDOM.setAttribute('data-index', index);
        root.appendChild(cellDOM);
    })
}

drawCells(cells);

function clearAll() {
    cells.forEach(cell => cell.isLife = false);
    drawCells(cells);
}

function drawNeig(cell) {
    clearAll();
    cell.getNeigh().forEach(n => n.isLife = true);
    cell.isLife = true;
    
    drawCells(cells);
}

root.addEventListener('click', (event) => {
    if (!event.target.hasAttribute('data-index')) return;
    var index = event.target.getAttribute('data-index');
    var cell = cells[+index];
    // drawNeig(cell);
    cell.isLife = !cell.isLife;
    drawCells(cells);
});

function step() {
    var newCellsLives = cells.map(cell => cell.getStep());
    var newCells = cells.map((cell, index) => {
        cell.isLife = newCellsLives[index];
        return cell;
    });

    cells = newCells;
    drawCells(cells);    
}

var isAutoStep = false;
var autostepTimer = null;

buttonInterval.addEventListener('click', function() {
    if (isAutoStep) {
        clearInterval(autostepTimer);
    } else {
        autostepTimer = setInterval(function() {
            step();
        }, 125)
    }

    isAutoStep = !isAutoStep;
});