console.log("Hello back to school");

// Declare to variables for use in the script

const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

let saleMap;
let totalSale;
let salesByProduct;
let salesBySegment;

const oregonWashingtonButton = document.getElementById("oregon_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo_button");
const minValue = document.getElementById("min_value");
const maxValue = document.getElementById("max_value");
const applyButton = document.getElementById("apply_button");

function logWorkbookInformation() {
  workbook = viz.workbook;
  console.log(`The name of the workbook is "${workbook.name}"`);

  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    console.log(`The sheet with index ${element.index} is ${element.name}`);
  });
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is ${vizActiveSheet.name}`);

  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    console.log(`The worksheet with index ${element.index} is ${element.name}`);
  });

  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSale = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesByProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesBySegment");
}

function oregonWashingtonFunction() {
  console.log(
    `Oregon Washington button press. ${oregonWashingtonButton.value}`
  );

  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSale.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function clearFilterFunction() {
  console.log(`Clear State filter`);

  saleMap.clearFilterAsync("State");
  totalSale.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
  //listSheets.forEach(element) => {element.clearFilterAsync("State")}
}

function unDo() {
  console.log("Undoing last action");
  viz.undoAsync();
}

function filterRangeFunction() {
  console.log(`Min value to filter: ${minValue.value}`);
  console.log(`Max value to filter: ${maxValue.value}`);

  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: parseFloat(minValue.value),
    max: parseFloat(maxValue.value),
  });
}

viz.addEventListener("firstinteractive", logWorkbookInformation);
oregonWashingtonButton.addEventListener("click", oregonWashingtonFunction);
clearFilterButton.addEventListener("click", clearFilterFunction);
undoButton.addEventListener("click", unDo);
applyButton.addEventListener("click", filterRangeFunction);
