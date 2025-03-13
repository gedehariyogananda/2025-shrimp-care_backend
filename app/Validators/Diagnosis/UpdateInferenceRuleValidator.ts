import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Disease from "App/Models/Master/Disease";
import Symptoms from "App/Models/Diagnosis/Symptoms";

export default class UpdateInferenceRuleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    disease_id: schema.string.optional({}, [
      rules.exists({ table: Disease.table, column: "id" }),
    ]),
    symptom_id: schema.string.optional({}, [
      rules.exists({ table: Symptoms.table, column: "id" }),
    ]),
  });
}
