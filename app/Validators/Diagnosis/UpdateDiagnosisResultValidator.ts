import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Disease from "App/Models/Master/Disease";
import Diagnosis from "App/Models/Diagnosis/Diagnosis";

export default class UpdateDiagnosisResultValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    diagnosis_id: schema.string.optional({}, [
      rules.exists({ table: Diagnosis.table, column: "id" }),
    ]),
    disease_id: schema.string.optional({}, [
      rules.exists({ table: Disease.table, column: "id" }),
    ]),
    percentage: schema.number.optional(),
  });
}
