import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Disease from "App/Models/Master/Disease";

export default class CreateDiseaseValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    code_disease: schema.string({}, [
      rules.maxLength(10),
      rules.unique({ table: Disease.table, column: "code_disease" }),
    ]),
    name_disease: schema.string({}, [rules.maxLength(100)]),
    image_disease: schema.string({}, [rules.maxLength(255)]),
    risk_level: schema.number(),
    description: schema.string.optional({}, [rules.maxLength(255)]),
    max_symptom: schema.number.optional(),

    definition_disease: schema.string.optional(),
    symptoms_disease: schema.string.optional(),
    causes_disease: schema.string.optional(),
    prevention_disease: schema.string.optional(),
    recomendation_disease: schema.string.optional(),
  });
}
