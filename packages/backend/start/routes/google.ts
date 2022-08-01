import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/:provider/redirect', async ({ response, ally, auth, params }) => {
  if (await auth.check()) {
    return response.notAcceptable()
  }

  return response.redirect(await ally.use(params.provider).stateless().redirectUrl())
})

Route.get('/:provider/callback', async ({ ally, auth, response, params }) => {
  try {
    if (await auth.check()) {
      return response.notAcceptable()
    }

    const provider = ally.use(params.provider).stateless()

    if (provider.accessDenied()) {
      return 'Access was denied'
    }

    if (provider.hasError()) {
      return provider.getError()
    }

    const { token } = await provider.accessToken()
    const providerUser = await provider.userFromToken(token)

    const user = await User.firstOrCreate({
      name: providerUser.name,
      email: providerUser.email!,
      provider: 'google',
      providerId: providerUser.id,
      photoUrl: providerUser.avatarUrl!,
    })

    const oat = await auth.use('api').login(user, {
      expiresIn: '7days',
    })

    return response.ok({ user, token: oat })
  } catch (error) {
    console.log(error)
  }
})
