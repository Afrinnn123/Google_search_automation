const xlsx = require('xlsx');

const dayOfWeek = new Date().toLocaleDateString('en-BD', { weekday: 'long' });
const workbook = xlsx.readFile('./cypress/e2e/4BeatsQ1.xlsx');

const sheetName = workbook.SheetNames.find(name => name.toLowerCase() === dayOfWeek.toLowerCase());
if (!sheetName) {
  throw new Error(`Sheet for ${dayOfWeek} not found`);
}

const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

module.exports = {
  data,
  updateSheet: (longestSuggestion, shortestSuggestion, index) => {
    data[index].LongestSuggestion = longestSuggestion;
    data[index].ShortestSuggestion = shortestSuggestion;

    const updatedSheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets[sheetName] = updatedSheet;
    xlsx.writeFile(workbook, './cypress/e2e/4BeatsQ1.xlsx'); 
  }
};


