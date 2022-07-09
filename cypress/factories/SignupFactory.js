var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function () {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whats: '55999999999',
            adress: {
                postalcode: '98780200',
                street: 'Rua Presidente Castelo Branco',
                number: '286',
                details: 'casa rosa',
                district: 'Centro',
                city_uf: 'Santa Rosa/RS'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data

    }
}