import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password, { expiresIn: '7days' })

    const { user } = token

    return { token, user }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.ok('ok')
  }
}