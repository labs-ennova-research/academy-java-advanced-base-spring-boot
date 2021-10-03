const source = [
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

function createSudokuUiMatrix() {
    const template = document.createElement("input");
    template.setAttribute("type", "text");
    template.setAttribute("maxlength", "1");
    template.style.width = "30px";
    template.style.backgroundColor = "#FFF";
    template.classList.add("sudoku-source");
    for (let row = 0; row < 9; row++) {
        const matrix = document.createElement('div');
        for (let column = 0; column < 9; column++) {
            template.id = `m-${row}-${column}`;
            let matrixCell = document.createElement('span');
            matrixCell.innerHTML = template.outerHTML;
            matrix.appendChild(matrixCell);
        }
        document.getElementById("sourceSudoku").appendChild(matrix);
    }

    const ele = document.querySelectorAll('.sudoku-source');

    ele.forEach(el => el.addEventListener('input', e => {
        if (e && e.target && e.target.value)
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }));
}

function loadData(data = source) {
    for (let ii = 0; ii < 9; ii++) {
        for (let jj = 0; jj < 9; jj++) {
            const ele = document.getElementById(`m-${ii}-${jj}`);
            ele.value = data[ii][jj];
            ele.style.backgroundColor = (data[ii][jj] > 0) ? "#3CBC8D" : "#FFF";
        }
    }
}

function resetData() {
    for (let ii = 0; ii < 9; ii++) {
        for (let jj = 0; jj < 9; jj++) {
            const ele = document.getElementById(`m-${ii}-${jj}`);
            ele.value = "";
            ele.style.backgroundColor = "#FFF";
        }
    }
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
}

function sendData() {
    let preparedData = JSON.parse(JSON.stringify(source));
    for (let ii = 0; ii < 9; ii++) {
        for (let jj = 0; jj < 9; jj++) {
            preparedData[ii][jj] = 0; //safe set to zero
            let cur = document.getElementById(`m-${ii}-${jj}`).value;
            preparedData[ii][jj] = cur == null || cur == '' || isNaN(parseInt(cur)) ? 0 : parseInt(cur);
        }
    }
    let dataToSend = {};
    dataToSend.matrix = preparedData;
    postData('http://localhost:8080/api/sudoku/solve', dataToSend)
        .then(response => response.json())
        .then(response => {
            if(response && response.matrix){
                loadData(response.matrix);
            } else {
                console.error(`Matrix object is not valid`, response);
            }
        }).catch(err => {
            console.error(err);
        });
}

createSudokuUiMatrix();