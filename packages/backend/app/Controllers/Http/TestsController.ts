import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Test from "../../Models/Test"

export default class TestsController {

    public async store({request, response}: HttpContextContract) {
        const body = request.body();

        const test = await Test.create(body);

        return response.created(test)

    }

    public async index() {

        const test = await Test.query()
        
        return test
    }

    public async show ({params}: HttpContextContract) {
        const test = await Test.findOrFail(params.id);

        return test
        

    }

    public async destroy({params}: HttpContextContract) {
        const test = await Test.findOrFail(params.id)

        await test.delete()

        return true

    }

    public async update({params, request}: HttpContextContract) {
        const body = request.body();

        const test = await Test.findOrFail(params.id);

        test.name = body.name;
        test.password = body.password;
        test.email = body.email

        await test.save()

        return test;

    }
}
