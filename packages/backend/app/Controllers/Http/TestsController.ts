import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Test from "../../Models/Test"

export default class TestsController {

    public async store({request, response}: HttpContextContract) {
        const body = request.body();

        const test = await Test.create(body);

        response.status(201)

        return {
            message: 'Test created sucessfully',
            data: test,
        }
    }

    public async index() {

        const test = await Test.query()
        
        return {
            data: test,

        }
    }

    public async show ({params}: HttpContextContract) {
        const test = await Test.findOrFail(params.id);

        return {
            data: test,
        }

    }

    public async destroy({params}: HttpContextContract) {
        const test = await Test.findOrFail(params.id)

        await test.delete()

        return {
            message: "Test deleted sucessfully",
            data: test,
        }

    }

    public async update({params, request}: HttpContextContract) {
        const body = request.body();

        const test = await Test.findOrFail(params.id);

        test.name = body.name;
        test.password = body.password;
        test.email = body.email

        await test.save()

        return {
            message: 'Test updated sucessfully',
            data: test,
        }

    }
}
