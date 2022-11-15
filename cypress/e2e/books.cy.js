describe('Books', () => {
  it('can list, show, create, update and delete books', () => {
    // List books
    cy.visit('/')
      .get('[data-cy=link-to-books]')
      .click()
    
    // Create book
    cy.get('[href="/libros/crear"]')
      .click()
      .get('#title')
      .type('My Book')
      .get('[data-cy=submit-button]')
      .click()
      .get('[data-cy=books-list]')
      .contains('My Book')
    
    // Show book
    cy.get('[data-cy^=link-to-book-]')
      .last()
      .click()
      .get('h1')
      .should('contain.text', 'My Book')
      .get('[href="/libros"]')
      .click()
    
    // Update book
    cy.get('[data-cy^=link-to-edit-book-]')
      .last()
      .click()
      .get('#title')
      .clear()
      .type('My Updated Book')
      .get('[data-cy=submit-button]')
      .click()
      .get('[data-cy=books-list]')
      .contains('My Updated Book')
    
    // Delete book
    cy.get('[data-cy^=delete-book-]')
      .last()
      .click()
      .get('[data-cy^=link-to-book-]')
      .last()
      .should('not.contain.text', 'My Updated Book')
  })
})