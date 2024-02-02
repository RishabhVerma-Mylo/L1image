const XLSX = require('xlsx')
const fs = require('fs')

let filePath = 'L2ImageAspectRatio.xlsx'
function writeToExcel(object) {
  // fs.unlinkSync(filePath)

  const workSheet = XLSX.utils.json_to_sheet(object)
  const workBook = XLSX.utils.book_new()

  XLSX.utils.book_append_sheet(workBook, workSheet, 'object')
  // Generate buffer
  XLSX.writeFile(workBook, filePath)
}

module.exports = { writeToExcel }
