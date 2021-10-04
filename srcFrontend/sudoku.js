/**
 * @author Alberto Ielpo
 * This is a library to resolve frontend side the sudoku problem
 */

/**
 * This cell is resolved
 * @param {Number} value 
 * @returns 
 */
function isResolved(value) {
    return value > 0;
}
/**
 * Sudoku is completed
 * @param {[Number][Number]} source 
 * @returns 
 */
function isAllResolved(source) {
    for (let ii = 0; ii < 9; ii++) {
        for (let jj = 0; jj < 9; jj++) {
            if (!isResolved(source[ii][jj])) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Get all the value giving a rowNumber
 * @param {[Number][Number]} source 
 * @param {Number} rowNumber 
 * @returns 
 */
function getValuesRow(source, rowNumber) {
    return source[rowNumber];
}

/**
 * Get all values giving a columnNumber
 * @param {[Number][Number]} source
 * @param {Number} columnNumber 
 * @returns 
 */
function getValuesColumn(source, columnNumber) {
    let columnValues = [];
    for (let ii = 0; ii < 9; ii++) {
        columnValues.push(source[ii][columnNumber]);
    }
    return columnValues;
}

/**
 * Get all the values of the square giving row and column
 * @param {[Number][Number]} source
 * @param {Number} rowNumber 
 * @param {Number} columnNumber 
 * @returns 
 */
function getValuesSquare(source, rowNumber, columnNumber) {
    let squareValues = [];
    let r = rowNumber - (rowNumber % 3);
    let c = columnNumber - (columnNumber % 3);
    for (let ii = 0; ii < 3; ii++) {
        for (let jj = 0; jj < 3; jj++) {
            squareValues.push(source[ii + r][jj + c]);
        }
    }
    return squareValues;
}

/**
 * Validate the number that I guess
 * @param {[Number][Number]} source
 * @param {Number} rowNumber 
 * @param {Number} columnNumber 
 * @param {Number} guess 
 * @returns 
 */
function validate(source, rowNumber, columnNumber, guess) {
    let availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let rowValues = getValuesRow(source, rowNumber).filter(x => x > 0);
    let columnValues = getValuesColumn(source, columnNumber).filter(x => x > 0);
    let squareValues = getValuesSquare(source, rowNumber, columnNumber).filter(x => x > 0);
    let allValues = new Set([...rowValues, ...columnValues, ...squareValues]);
    for (let r of [...allValues]) {
        let idx = availableValues.indexOf(r);
        if (idx != -1) {
            availableValues.splice(idx, 1);
        }
    }
    if (availableValues.length == 0 || availableValues.indexOf(guess) != -1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @param {[Number][Number]} source 
 * @returns 
 */
function solve(source) {
    for (let row = 0; row < 9; row++,recursiveCalls++) {
        for (let column = 0; column < 9; column++) {
            if (!isResolved(source[row][column])) {
                for (let guess = 1; guess < 10; guess++, totalIteration++) {
                    if (validate(source, row, column, guess)) {
                        source[row][column] = guess;
                        if (solve(source)) {
                            return true;
                        } else {
                            source[row][column] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }

    //if arrives here the sudoku it's completely resolved
    return true;
}

/**
 * Application main
 */
function main() {
    let source = [
        [7, 5, 0, 0, 1, 0, 3, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 5],
        [9, 0, 8, 0, 0, 0, 0, 0, 4],
        [0, 4, 0, 0, 6, 0, 2, 0, 0],
        [6, 0, 0, 9, 0, 3, 0, 0, 8],
        [0, 0, 7, 0, 5, 0, 0, 6, 0],
        [5, 0, 0, 0, 0, 0, 8, 0, 1],
        [1, 0, 0, 0, 8, 0, 0, 0, 0],
        [0, 0, 6, 0, 4, 0, 0, 9, 7]
    ];
    let startTimestamp = new Date().getTime();
    solve(source);
    let endTimestamp = new Date().getTime();
    console.log(source);
    console.log(`Is the sudoku resolved? ${isAllResolved(source)}`);
    console.log(`Execution time...${endTimestamp-startTimestamp} ms`);
    console.log(`Total iteration... ${totalIteration}`);
    console.log(`Recursive calls... ${recursiveCalls}`);
}
var totalIteration = 0;
var recursiveCalls = 0;
//main();