describe('Home page', () => {
    it('app deve estar online', () => {
        cy.viewport(1920, 1080)
        cy.visit('https://buger-eats.vercel.app')
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
    })
})

//testa se o aplicativo está online, redimensiona a tela para teste e visita a página.