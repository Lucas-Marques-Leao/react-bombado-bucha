/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import './routes/google'
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { Hello: 'World' }
  })

  Route.resource('/users', 'UsersController').middleware({})

  Route.get('/users/email/:email', 'UsersController.email')

  Route.resource('/tests', 'TestsController').apiOnly()

  Route.post('/login', 'AuthController.store')

  Route.post('/logout', 'AuthController.destroy')
})
