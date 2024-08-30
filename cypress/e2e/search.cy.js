const { data, updateSheet } = require('../../searchAndUpdate');

describe('Google Search Automation', () => {
  data.forEach((row, index) => {
    it(`Search for ${row.Keyword}`, () => {
      cy.visit('https://www.google.com');
      cy.get('input[name="q"]').type(`${row.Keyword}{enter}`);
      
      cy.get('.sbl1 span').then((suggestions) => {
        const suggestionTexts = suggestions.map((i, el) => Cypress.$(el).text()).get();
        const longestSuggestion = suggestionTexts.reduce((a, b) => a.length > b.length ? a : b);
        const shortestSuggestion = suggestionTexts.reduce((a, b) => a.length < b.length ? a : b);
      
        updateSheet(longestSuggestion, shortestSuggestion, index);
      });
    });
  });
});
