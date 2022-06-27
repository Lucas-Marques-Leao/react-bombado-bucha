import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/user/StoreValidator';
import User from '../../Models/User';

export default class UsersController {
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(StoreValidator);

        try {
            const user = await User.create(data);
            return user
        } catch (err) {
            return response.internalServerError('Error creating user')
        }



    }
    
    public async email({ params, response }: HttpContextContract) {
        const user = await User.findBy('email', params.email);

        if (!user) {
            return response.notFound('User not found')
        }
        return user

    }

    public async index({ }: HttpContextContract) { }

    public async show({ }: HttpContextContract) { }

    public async destroy({ }: HttpContextContract) { }

    public async update({ }: HttpContextContract) { }


}
