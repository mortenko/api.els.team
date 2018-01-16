'use strict'

const User = use('App/Models/User')
const InvalidCredential = use('App/Exceptions/InvalidCredentialException')

class SessionController {
  async store ({ auth, request, response }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)
      .catch((e) => {
        throw new InvalidCredential('Authentication failed. Either supplied credentials are invalid or the account is inactive', 401, 'E_INVALID_CREDENTIAL')
      })

    return response.ok({
      token,
      status: 200,
      message: 'Logged in successfully',
    })
  }
}

module.exports = SessionController
