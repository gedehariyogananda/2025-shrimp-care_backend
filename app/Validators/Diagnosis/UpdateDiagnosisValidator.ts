import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateDiagnosisValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    user_id: schema.string.optional({}, [
      rules.exists({ table: "users", column: "id" }),
    ]),
    disease_id: schema.string.optional({}, [
      rules.exists({ table: "diseases", column: "id" }),
    ]),
  });
}
