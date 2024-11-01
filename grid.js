let rows  = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
let addressRowCont = document.querySelector(".address-row-cont");
let cellsCont = document.querySelector(".cells-cont");
let addressBar = document.querySelector(".address-bar");

// rows from 1 to 100
for(let i = 0; i < rows; i++){
  let addressCol = document.createElement("div");
  addressCol.setAttribute("class", "address-col");
  addressCol.innerText = i + 1;
  addressColCont.appendChild(addressCol);
}

// columns from A to Z
for(let i = 0; i < cols; i++){
  let addressRow = document.createElement("div");
  addressRow.setAttribute("class", "address-row");
  addressRow.innerText = String.fromCharCode(65 + i);
  addressRowCont.appendChild(addressRow);
}


// 100 x 26 cells
for(let i = 0; i < rows; i++){

  let rowCont = document.createElement("div");
  rowCont.setAttribute("class", "row-cont");

  for(let j = 0; j < cols; j++){

    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.setAttribute("contenteditable", "true");
    cell.setAttribute("spellcheck", "false");
    
    // Attributes for cell and storage identification
    cell.setAttribute("rid", i);
    cell.setAttribute("cid", j);

    rowCont.appendChild(cell);

    addEventListenerForAddressBarDisplay(cell, i, j);
  }

  cellsCont.appendChild(rowCont);

}


function addEventListenerForAddressBarDisplay(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1;
    let colID = String.fromCharCode(65 + j);
    addressBar.value = `${colID}${rowID}`;
  })
}


// By default click on first cell via DOM
// let firstCell = document.querySelector(".cell");
// firstCell.click();