import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.required()]),
    name: schema.string({}, [rules.required()]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(8),
      rules.confirmed('password_confirmation'),
    ]),
  })

  public messages = {
    'email.required': 'Email is required',
    'email.email': 'Email is invalid',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be at least 8 characters',
    'password.confirmed': 'Password confirmation does not match',
    'name.required': 'Name is required',
  }
}
