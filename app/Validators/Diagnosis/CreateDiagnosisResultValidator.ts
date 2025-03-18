import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Diagnosis from "App/Models/Diagnosis/Diagnosis";
import Disease from "App/Models/Master/Disease";

export default class CreateDiagnosisResultValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    diagnosis_id: schema.string({}, [
      rules.exists({ table: Diagnosis.table, column: "id" }),
    ]),
    disease_id: schema.string({}, [
      rules.exists({ table: Disease.table, column: "id" }),
    ]),
    percentage: schema.number(),
  });
}
