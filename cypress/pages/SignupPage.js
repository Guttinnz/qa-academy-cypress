class SignupPage {

    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1')
    }

    fillForm(deliver) {
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whats)

        cy.get('input[name="postalcode"]').type(deliver.adress.postalcode)

        // mock do cep para testar quando a API ou integração estiver offline
        cy.fixture('mockcep').then(function (mockcep) {
            cy.intercept('GET', ' https://viacep.com.br/ws/**', {
                status: 200,
                body: mockcep
            }).as('mockCep')

            cy.get('input[type=button][value="Buscar CEP"]').click()

            cy.wait('@mockCep')
        })

        cy.get('input[name=address-number]').type(deliver.adress.number)
        cy.get('input[name=address-details]').type(deliver.adress.details)

        cy.get('input[name="address"]').should('have.value', deliver.adress.street)
        cy.get('input[name="district"]').should('have.value', deliver.adress.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.adress.city_uf)

        cy.contains('.delivery-method li', deliver.delivery_method).click() // combina CSS selector com texto
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container').should('have.text', expectedMessage)
    }

    alertMessageShouldBe(expectedMessage) {
        // cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage; // exporta já pronto para ser utilizado graças ao new