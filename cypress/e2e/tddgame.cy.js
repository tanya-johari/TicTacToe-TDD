describe('Tic Tac Toe App', () => {
  it('should display the initial game board', () => {
    cy.visit('http://localhost:3000/'); // Assuming app runs on port 3000

    cy.get('.board-row').should('have.length', 3); // Verify three rows

    cy.get('.square').each(($square) => {
      expect($square.text()).to.equal('') // Check for empty squares
    });
  });

  it('should allow a player to make a move and update the board', () => {
    cy.visit('http://localhost:3000');

    cy.get('.square').first().click(); // Click the first square

    cy.get('.square').first().should('have.text', 'X'); // Verify X is displayed

    cy.get('.status').should('contain', 'Next player: O'); // Verify status update
  });

  it('should not allow a player to make a move on a filled square', () => {
    cy.visit('http://localhost:3000');

    cy.get('.square').first().click(); // Click the first square

    cy.get('.square').first().click(); // Click the same square again

    cy.get('.status').should('be.visible'); // Assert element is visible

    cy.get('.status').should('contain', 'Next player: O'); // Verify status remains unchanged
  });

  it('should declare a winner when a row is filled', () => {
    cy.visit('http://localhost:3000');

    // Simulate player moves to fill a row (eg. top row)
    cy.get('.square').eq(0).click(); // X's turn
    cy.get('.square').eq(6).click(); // O's turn
    cy.get('.square').eq(1).click(); // X's turn
    cy.get('.square').eq(8).click(); // O's turn
    cy.get('.square').eq(2).click(); // X's turn

    cy.get('.status').should('contain', 'Winner: X'); // Verify winner announcement
  });

  it('should allow jumping to previous moves using the move history', () => {
    cy.visit('http://localhost:3000');

    // Simulate making some moves
    cy.get('.square').eq(0).click(); // Click first square
    cy.get('.square').eq(4).click(); // Click fifth square
    cy.get('.square').eq(1).click(); // Click second square

    // Click on a move in the history to go back
    cy.get('.game-info button').contains('Go to move #1').click(); // Replace with actual selector

    // Verify board state after going back
    cy.get('.square').eq(0).should('have.text', 'X'); // First move remains
    cy.get('.square').eq(1).should('have.text', ''); // Second move not made yet
    cy.get('.square').eq(4).should('not.have.text', 'O'); // Fifth move not made yet
    cy.get('.status').should('contain', 'Next player: O'); // Status update


    cy.get('.game-info ol li').first().click(); // Go to game start
    cy.get('.square').eq(0).should('be.empty'); // Square should be empty again

  });

});