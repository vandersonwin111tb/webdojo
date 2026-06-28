describe('expert', ()=> {
    beforeEach(()=>{
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', ()=> {
        cy.log('todo')

        cy.get('#email').invoke('val', 'papito@teste.com.br')

        // cy.get('#password').invoke('attr', 'type', 'text')
        // cy.get('#password').invoke('removeAttr', 'class')
            // .type('senha123')

        cy.get('#password').invoke('attr', 'name', 'senha')
        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')

    })
})