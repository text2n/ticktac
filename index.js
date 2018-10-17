/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let totalMoved = 0;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}
let lastPlayer = 1;
function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    totalMoved++;
    grid[colIdx][rowIdx] = 1;
    lastPlayer = 1;
    renderMainGrid();
    addClickHandlers();

    if (checkWin(grid)) {
        alert("You won!");
        return;
    }
    computerMove();
}

function computerMove() {
    lastPlayer = 2;
    let nextMove = getNextMove()
    if (nextMove == 0) {
        alert("Match Draw");
    } else {
        grid[nextMove[0]][nextMove[1]] = 2;
    }
    renderMainGrid();
    addClickHandlers();
    let win = checkWin(grid);
    if (win == 2) {
        alert("Computer won!");
    } else if (win == 3) {
        alert("Match Draw!");
    }
}

function getNextMove() {
    remainingMoves = getRemainingMoves(grid);
    if (remainingMoves.length == 0) {
        return 0;
    }

    rank = [];

    for (let i=0;i<remainingMoves.length;i++) {
        rank[i] = 0;
        let gridCpy = JSON.parse(JSON.stringify(grid));
        gridCpy[remainingMoves[i][0]][remainingMoves[i][1]] = 2;
        let win = checkWin(gridCpy);

        if (win == 2) {
            rank[i] = 2;
            continue;
        } else if (win == 3) {            
            continue;
        }

        for (let j=0;j<remainingMoves.length;j++) {
            if (j == i) {
                continue;
            }
            gridCpy[remainingMoves[j][0]][remainingMoves[j][1]] = 1;
            
            let win = checkWin(gridCpy);
            
            if (win == 1) {
                gridCpy[remainingMoves[j][0]][remainingMoves[j][1]] = 0;
                rank[i] = -1;
                continue;
            } else if (typeof rank[i] == 0){
                gridCpy[remainingMoves[j][0]][remainingMoves[j][1]] = 0;
                rank[i] = 1;
                continue;
            }
            gridCpy[remainingMoves[j][0]][remainingMoves[j][1]] = 0;
        }
    }

    let best = 0;
    for (let i = 0;i < remainingMoves.length;i++) {
        if (rank[best] < rank[i]) {
            best = i;
        }
    }

    return remainingMoves[best];
}

function getRemainingMoves(cgrid) {
    let remainingMoves = [];
    for (let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx=0;rowIdx < GRID_LENGTH; rowIdx++) {
            if (cgrid[colIdx][rowIdx] == 0) {
                remainingMoves.push([colIdx, rowIdx]);
            }
        }
    }

    return remainingMoves;
}
cSum = 0;
rSum = 0;
function checkWin(cgrid) {
    d1Sum = 0;
    d2Sum = 0;
    for (let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        cSum = 0;
        rSum = 0;
        for (let rowIdx=0;rowIdx < GRID_LENGTH; rowIdx++) {
            if (cgrid[colIdx][rowIdx] == 1) {
                cSum++
            } else if (cgrid[colIdx][rowIdx] == 2) {
                cSum--;
            }
            if (cgrid[rowIdx][colIdx] == 1) {
                rSum++
            } else if (cgrid[rowIdx][colIdx] == 2) {
                rSum--;
            }
        }
        if (cSum == GRID_LENGTH || rSum == GRID_LENGTH) {
            return 1;
        } else if (cSum == -GRID_LENGTH || rSum == -GRID_LENGTH) {
            return 2;
        }

        if (cgrid[colIdx][colIdx] == 1) {
            d1Sum++
        } else if (cgrid[colIdx][colIdx] == 2) {
            d1Sum--;
        }
        ng = GRID_LENGTH - colIdx - 1;
        if (cgrid[colIdx][ng] == 1) {
            d2Sum++
        } else if (cgrid[colIdx][ng] == 2) {
            d2Sum--;
        }
    }

    if (d1Sum == GRID_LENGTH || d2Sum == GRID_LENGTH) {
        return 1;
    } else if (d1Sum == -GRID_LENGTH || d2Sum == -GRID_LENGTH) {
        return 2;
    }

    return 0;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
