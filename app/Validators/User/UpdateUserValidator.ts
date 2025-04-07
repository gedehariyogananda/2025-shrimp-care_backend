import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User/User";

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    name: schema.string.optional({}, [rules.maxLength(100)]),
    username: schema.string.optional({}, [
      rules.maxLength(100),
      rules.unique({ table: User.table, column: "username" }),
    ]),
    email: schema.string.optional({}, [
      rules.maxLength(255),
      rules.email(),
      rules.unique({ table: User.table, column: "email" }),
    ]),
    password: schema.string.optional({}, [rules.minLength(6)]),
    employment: schema.string.optional({}, [rules.maxLength(100)]),
    roles: schema.string.optional({}, [rules.maxLength(100)]),
    google_id: schema.string.optional({}, [rules.maxLength(255)]),
  });
}
