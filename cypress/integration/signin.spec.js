import signupPage from '../pages/SignupPage' // é minusculo para já vir instânciada
import signupFactory from '../factories/SignupFactory'

describe('Signin', () => {

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

    it('User must be a deliver', function () {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = '123456AAABC'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {

        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' },
        ]

        before(function () { // funções para fazer teste de ação
            signupPage.go()
            signupPage.submit()
        })

        messages.forEach(function (msg) { // substitui os testes it, testes dinâmicos onde se um falhar não interrompe o teste completo
            it(`${msg.field} is required`, function () {
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

    // it('Required fields', function () {
    //     signupPage.go()
    //     signupPage.submit()
    //     signupPage.alertMessageShouldBe('É necessário informar o nome')
    //     signupPage.alertMessageShouldBe('É necessário informar o CPF')
    //     signupPage.alertMessageShouldBe('É necessário informar o email')
    //     signupPage.alertMessageShouldBe('É necessário informar o CEP')
    //     signupPage.alertMessageShouldBe('É necessário informar o número do endereço')
    //     signupPage.alertMessageShouldBe('Selecione o método de entrega')
    //     signupPage.alertMessageShouldBe('Adicione uma foto da sua CNH')
    // })
})