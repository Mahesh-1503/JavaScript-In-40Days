// ==========================================
// DAY 16 COMPLEMENTARY SCRIPT: MULTIDIMENSIONAL ARRAYS
// ==========================================

console.log("--- 1. Matrix Initialization & Indexing ---");
// Create a 3x3 matrix representing a tic-tac-toe game grid
const board = [
  ["X", "O", " "], // Row 0
  [" ", "X", "O"], // Row 1
  ["O", " ", "X"]  // Row 2
];

console.log("Entire Board Layout:", board);
console.log("Center Element (board[1][1]):", board[1][1]); // "X"
console.log("Top-Right Element (board[0][2]): '%s'", board[0][2]); // " "

// Modify cell
board[0][2] = "X";
console.log("Modified Top-Right Element (board[0][2]): '%s'", board[0][2]); // "X"


console.log("\n--- 2. Matrix Traversal Schemes (Row-wise vs. Column-wise) ---");
const scoreMatrix = [
  [88, 92, 95], // Student 0 scores
  [76, 81, 89], // Student 1 scores
  [90, 94, 98]  // Student 2 scores
];

const rows = scoreMatrix.length;
const cols = scoreMatrix[0].length;

// A. Row-wise Traversal: outer loop reads row index, inner loop reads col index
console.log("A. Row-wise traversal:");
for (let r = 0; r < rows; r++) {
  let rowStr = `Row ${r}: `;
  for (let c = 0; c < cols; c++) {
    rowStr += `${scoreMatrix[r][c]} `;
  }
  console.log(rowStr);
}

// B. Column-wise Traversal: outer loop reads col index, inner loop reads row index
console.log("\nB. Column-wise traversal:");
for (let c = 0; c < cols; c++) {
  let colStr = `Col ${c}: `;
  for (let r = 0; r < rows; r++) {
    colStr += `${scoreMatrix[r][c]} `;
  }
  console.log(colStr);
}


console.log("\n--- 3. Dynamic Matrix Transposition (Conversion) ---");
// Transpose swaps Row indices and Column indices: matrix[r][c] becomes result[c][r]
function transpose(matrix) {
  const rowsCount = matrix.length;
  const colsCount = matrix[0].length;
  const result = [];

  for (let c = 0; c < colsCount; c++) {
    const tempRow = [];
    for (let r = 0; r < rowsCount; r++) {
      tempRow.push(matrix[r][c]);
    }
    result.push(tempRow);
  }
  return result;
}

const originalData = [
  [1, 2, 3, 4],
  [5, 6, 7, 8]
];

console.log("Original 2x4 Data Matrix:\n", originalData);
const transposedData = transpose(originalData);
console.log("Transposed 4x2 Data Matrix:\n", transposedData);
// Verify dimensions
console.log("Original Dimensions: %dx%d", originalData.length, originalData[0].length);
console.log("Transposed Dimensions: %dx%d", transposedData.length, transposedData[0].length);
