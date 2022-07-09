import signupPage from '../pages/SignupPage' // é minusculo para já vir instânciada
import signupFactory from '../factories/SignupFactory'
describe('Cadastro', () => {

    // before(function(){
    //     cy.log('É executado uma única vez ANTES de todos casos de testes')
    // })

    // beforeEach(function(){
    //     cy.log('Aqui é executado sempre ANTES de cada caso de teste')
    // })

    // after(function(){
    //     cy.log('É executado uma única vez DEPOIS de todos casos de testes')
    // })

    // afterEach(function(){
    //     cy.log('Aqui é executado sempre DEPOIS de cada caso de teste')
    // })

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })

    it('Usuário deve se tornar um deliver', function () {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('CPF incorreto', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = '123456AAABC'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Email incorreto', function () {

        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    it('Required fields', function(){
        signupPage.go()
        signupPage.submit()
        signupPage.alertMessageShouldBe('É necessário informar o nome')
        signupPage.alertMessageShouldBe('É necessário informar o CPF')
        signupPage.alertMessageShouldBe('É necessário informar o email')
        signupPage.alertMessageShouldBe('É necessário informar o CEP')
        signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
        signupPage.alertMessageShouldBe('Selecione o método de entrega')
        signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    })
})