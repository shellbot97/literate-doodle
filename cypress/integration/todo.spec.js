const items = [
    {text: 'Buy milk', expectedLength: 1},
    {text: 'Buy eggs', expectedLength: 2},
    {text: 'Buy bread', expectedLength: 3}
];

describe('Test our Todo App', () => {
   before(() => {
      cy.visit('https://todomvc.com/examples/react/#/');
   });

   it('Add new todos', () => {
       cy.wrap(items).each(todo => {
           cy.get('.new-todo')
               .focused()
               .type(todo.text)
               .type('{enter}');

           cy.get('.todo-list li').should('have.length', todo.expectedLength);
       });
   });

   it('Should Update todos', () => {
       cy.get('.todo-list li').each($todoItem => {
           const text = $todoItem.text();
           const updateText = `${text} - updated`;

           cy.wrap($todoItem)
               .dblclick()
               .focused()
               .clear()
               .type(updateText)
               .type('{enter}');

           cy.wrap($todoItem).should('have.text', updateText);
       });
   });

   it('Delete Todos', () => {
       cy.get('.todo-list li').each($todoItem => {
           cy.wrap($todoItem)
               .find('.destroy')
               .invoke('show')
               .click()
               .should('not.exist');
       });
   })
});
