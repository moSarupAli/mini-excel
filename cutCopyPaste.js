let ctrlKey;
document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey;
});
document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey;
});

let copyBtn = document.querySelector(".copy");
let cutBtn = document.querySelector(".cut");
let pasteBtn = document.querySelector(".paste");

for(let i = 0; i < rows; i++) {
  for(let j = 0; j < cols; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    handleSelectedCells(cell);
  }
}

let rangeStorage = [];
function handleSelectedCells(cell) {
  cell.addEventListener("click", (e) => {
    // Select cell range work
    if(!ctrlKey) return;
    if(rangeStorage.length >= 2) {
      defaultSelectedCellsUI();
      rangeStorage = [];
    }

    // UI
    cell.style.border = "3px solid #218c74";

    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));
    rangeStorage.push([rid, cid]);
    console.log(rangeStorage);
    
  })
}


function defaultSelectedCellsUI(){
  for(let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
    cell.style.border = "1px solid lightgray";
  }
}


let copyData = [];
copyBtn.addEventListener("click", (e) => {
  if(rangeStorage.length < 2) return;
  copyData = [];

  let startRow = rangeStorage[0][0];
  let startCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];
  for(let i = startRow; i <= endRow; i++){
    let copyRow = [];
    for(let j = startCol; j <= endCol; j++){
      let cellProp = sheetDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }

  console.log(copyData);
  defaultSelectedCellsUI();
})


cutBtn.addEventListener("click", (e) => {
  if(rangeStorage.length < 2) return;

  let startRow = rangeStorage[0][0];
  let startCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];

  for(let i = startRow; i <= endRow; i++){
    for(let j = startCol; j <= endCol; j++){
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);

      // DB
      let cellProp = sheetDB[i][j];
      cellProp.value = "";
      cellProp.bold = false;
      cellProp.italic = false;
      cellProp.underline = false;
      cellProp.fontSize = 14;
      cellProp.fontFamily = "monospace";
      cellProp.fontColor = "#000000";
      cellProp.BGcolor = "#000000";
      cellProp.alignment = "left";

      // UI
      cell.click();
    }
  }
  
  defaultSelectedCellsUI();
})


pasteBtn.addEventListener("click", (e) => {
  // Paste cells data work
  if(rangeStorage.length < 2) return;

  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  // Target
  let address = addressBar.value;
  let [startRow, startCol] = decodeRIDCIDFromAddress(address);

  // r: row of copydata
  // c: col of copydata
  for(let i = startRow, r = 0; i <= startRow + rowDiff; i++, r++) {
    for(let j = startCol, c = 0; j <= startCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      if(!cell) return;

      // DB
      let data = copyData[r][c];
      let cellProp = sheetDB[i][j];

      cellProp.value = data.value;
      cellProp.bold = data.bold;
      cellProp.italic = data.italic;
      cellProp.underline = data.underline;
      cellProp.fontSize = data.fontSize;
      cellProp.fontFamily = data.fontFamily;
      cellProp.fontColor = data.fontColor;
      cellProp.BGcolor = data.BGcolor;
      cellProp.alignment = data.alignment;

      // UI
      cell.click();
    }
  }
})