import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User/User";
import Disease from "App/Models/Master/Disease";

export default class CreateDiagnosisValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    user_id: schema.string({}, [
      rules.exists({ table: User.table, column: "id" }),
    ]),
    best_disease_id: schema.string.optional({}, [
      rules.exists({ table: Disease.table, column: "id" }),
    ]),
    threshold: schema.number(),
    best_percentage_disease: schema.number(),
  });
}
