describe('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Wolverine',
      email: 'logan@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)

      expect(response.body.message).to.eq('User account successfully created.')
      expect(response.body.user.id).to.match(/^\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)

    })
  })

  it('Não deve cadastrar com email duplicado', () => {

    const user = {
      name: 'Cyclop',
      email: 'scott@xmen.com',
      password: 'pwd123'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('A user with the provided email address already exists.')
    })
  })

  it('O campo name deve ser obrigatório', () => {
    const user = {
      email: 'storm@xmen.com',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('The \"name\" field is required.')
    })
  })

  it('O campo email deve ser obrigatório', () => {
    const user = {
      name: 'Jean Grey',
      password: 'pwd123'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"email\" field is required.')
    })
  })

  it('O campo senha deve ser obrigatório', () => {
    const user = {
      name: 'Charles Xavier',
      email: 'xavier@xmen.com'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)

      expect(response.body.error).to.eq('The \"password\" field is required.')
    })
  })

  it('Não deve passar quando o JSON está mal formatado', () => {
    const user = `{
      name: 'Magneto',
      email: 'eric@xmen.com'
      password: 'pwd123'
    }`

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON Format')
    })
  })
})

