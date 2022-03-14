/// <reference types ="cypress" />

var Chance = require('chance')
var chance = new Chance() 

var email = chance.email()


describe('Cadastro', () => {

    beforeEach(() => {
        cy.visit('index.php')
      })

    it('Quando eu informar os dados e finalizar, então o cadastro deve ser finalizado', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.url().should('contain', 'my-account') 
        cy.get('.page-heading').should('have.text', 'My account')
        cy.get('.account').should('be.visible')

    });

    it('Quando eu informar os dados e finalizar, deslogar e realizar login, então o cadastro deve ser finalizado e deve ser realizado o l.ogin corretamente', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(email)
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.url().should('contain', 'my-account') 
        cy.get('.page-heading').should('have.text', 'My account')
        cy.get('.account').should('be.visible')

        cy.get('.logout').click()

        cy.get('#email').type(email)
        cy.get('#passwd').type('teste123')
        cy.get('#SubmitLogin').click()

        cy.url().should('contain', 'my-account') 
        cy.get('.page-heading').should('have.text', 'My account')
        cy.get('.account').should('be.visible')

    });

    it('Quando eu informar os dados de pré cadastro com um e-mail já existente e clicar em create an account, então deve ser exibida a mensagem de erro', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type('teste@email.com')
        cy.get('#SubmitCreate').click()

        cy.get('#create_account_error').should('contain', 'An account using this email address has already been registered.')

    });

    it('Quando eu informar os dados de pré cadastro com um e-mail já em formato incorreto e clicar em create an account, então deve ser exibida a mensagem de erro', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type('teste@email')
        cy.get('#SubmitCreate').click()

        cy.get('#create_account_error').should('contain', 'Invalid email address.')

    });

    it('Quando eu tentar efetuar um cadastro sem informar o primeiro nome, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'firstname is required.')

    });

    it('Quando eu tentar efetuar um cadastro sem informar o último nome, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'lastname is required.')

    });

    it('Quando eu tentar efetuar um cadastro sem informar a senha, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'passwd is required.')

    });

    it('Quando eu tentar efetuar um cadastro informando a senha em um formato inválido, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('1')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'passwd is invalid.')

    });

    it('Quando eu tentar efetuar um cadastro informando a data de nascimento em um formato inválido, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        //cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'Invalid date of birth')

    });

    it('Quando eu tentar efetuar um cadastro sem informar um endereço, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'address1 is required.')

    });

    it('Quando eu tentar efetuar um cadastro sem informar a cidade, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'city is required.')

    });

    it('Quando eu tentar efetuar um cadastro sem informar o estado, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'This country requires you to choose a State.')

    });

    it('Quando eu tentar efetuar um cadastro sem informar o código postal, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#other').type('Na beira da praia')

        cy.get('#phone').type('33256968')
        cy.get('#phone_mobile').type('985697412')
        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', `The Zip/Postal code you've entered is invalid.`)

    });

    it('Quando eu tentar efetuar um cadastro sem informar um telefone, então o cadastro não deve ser efetuado e deve exibir uma mensagem de alerta', () => {
        
        cy.get('.login').click()

        cy.get('#email_create').type(chance.email())
        cy.get('#SubmitCreate').click()

        cy.waitFor('#account-creation_form')
        cy.get('#id_gender1').check()

        cy.get('#customer_firstname').type(chance.first())
        cy.get('#customer_lastname').type(chance.last())
        cy.get('#passwd').type('teste123')

        cy.get('#days').select('12')
        cy.get('#months').select('7')
        cy.get('#years').select('1993')

        cy.get('#company').type('Agilizei')

        cy.get('#address1').type('Rua teste, 355')
        cy.get('#address2').type('Apartamento 22')

        cy.get('#id_country').select('21')
        cy.get('#city').type('Kailua')
        cy.get('#id_state').select('11')
        cy.get('#postcode').type('12345')
        cy.get('#other').type('Na beira da praia')

        cy.get('#alias').clear().type('Minha Casa')

        cy.get('#submitAccount').click()

        cy.get('.alert').should('contain', 'You must register at least one phone number.')

    });
});