import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User';

export default class UsersController {
    public async store({request, response}: HttpContextContract) {
        const body = request.body();

        const user = await User.create(body);

        return response.created(user)

    }

    public async index() {

        const user = await User.query()
        
        return user
    }

    public async show ({params}: HttpContextContract) {
        const user = await User.findOrFail(params.id);

        return user
        

    }

    public async destroy({params}: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        await user.delete()

        return true

    }

    public async update({params, request}: HttpContextContract) {
        const body = request.body();

        const user = await User.findOrFail(params.id);

        user.name = body.name;
        user.password = body.password;
        user.passwordConfirmation = body.passwordConfirmation
        user.email = body.email

        await user.save()

        return user;

    }
}
