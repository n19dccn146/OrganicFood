// const title = 'Reporting';
// const header = ['Name', 'Age', 'Email'];
// const data = [
//   { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
//   { Name: 'Jane Smith', Age: 28, Email: 'jane@example.com' },
// ];

// createExcelFileWithHeaderAndData(title, header, data, "report.xlsx");

const ExcelJS = require('exceljs');

const createExcelFileWithHeaderAndData = async(title, header, data, fileName) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Report');

  // Add a title row
  worksheet.addRow([]);
  worksheet.addRow([title]).font = { size: 16, bold: true };  
  worksheet.addRow([]);

  // Add data headers
  worksheet.columns = header.map((col) => ({ header: col, key: col, width: 'auto' }));

  // Add data rows
  worksheet.addRows(data);

  // Save the workbook to a file or stream
  workbook.xlsx.writeFile(fileName)
    .then(function() {
      console.log(`Excel file "${fileName}" created with title`);
    })
    .catch(function(error) {
      console.error(error);
    });
}

module.exports = {
    createExcelFileWithHeaderAndData
  };