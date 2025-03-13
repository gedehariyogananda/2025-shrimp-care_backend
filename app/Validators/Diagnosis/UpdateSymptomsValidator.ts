import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Symptoms from "App/Models/Diagnosis/Symptoms";

export default class UpdateSymptomsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    code_symptom: schema.string.optional({}, [
      rules.maxLength(10),
      rules.unique({ table: Symptoms.table, column: "code_symptom" }),
    ]),
    name_symptom: schema.string.optional({}, [rules.maxLength(100)]),
    description: schema.string.optional({}, [rules.maxLength(255)]),
    keyword_symptom: schema.string.optional({}, [rules.maxLength(255)]),
  });
}
