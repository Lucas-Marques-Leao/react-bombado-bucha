import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
// import Env from '@ioc:Adonis/Core/Env'

Route.get('/google/redirect', async ({ response, ally, auth }) => {
  if (await auth.check()) {
    return response.notAcceptable()
  }

  return response.redirect(await ally.use('google').stateless().redirectUrl())
})

Route.get('/google/callback', async ({ ally, auth, response }) => {
  if (await auth.check()) {
    return response.notAcceptable()
  }

  const provider = ally.use('google').stateless()

  if (provider.accessDenied()) {
    return 'Access was denied'
  }

  if (provider.hasError()) {
    return provider.getError()
  }

  const { token } = await provider.accessToken()
  const providerUser = await provider.userFromToken(token)

  const user = await User.firstOrCreate(
    {
      email: providerUser.email!,
    },
    {
      name: providerUser.name,
      email: providerUser.email!,
    }
  )

  // await user.related('token').firstOrCreate({
  //   lastName: providerUser.original.family_name,
  //   firstName: providerUser.original.given_name,
  // })

  const oat = await auth.use('api').login(user, {
    expiresIn: '7days',
  })

  // response.cookie(String(Env.get('API_TOKEN_COOKIE_NAME')), oat.token, {
  //   maxAge: 60 * 60 * 24 * 7,
  //   sameSite: 'none',
  //   secure: true,
  //   httpOnly: true,
  // })

  return response.ok(user)
})
