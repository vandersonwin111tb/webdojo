describe('expert', () => {
    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', () => {
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

    it('Não deve logar com senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'katana321')

        // cy.wait(2500)

        // cy.document().then((doc) => {
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        // })

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')
        
        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
            .should('not.exist')
    })

    it.only('simulando a tecla TAB com cy.press', ()=> {
        cy.log('todo')

        cy.get('body').press('Tab')
        cy.focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
        cy.focused().should('have.attr', 'id', 'password')

    })
})