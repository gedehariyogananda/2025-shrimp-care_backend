import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Diagnosis from "App/Models/Diagnosis/Diagnosis";
import Symptoms from "App/Models/Diagnosis/Symptoms";

export default class CreateDiagnosisDetailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    diagnosis_id: schema.string({}, [
      rules.exists({ table: Diagnosis.table, column: "id" }),
    ]),
    symptom_id: schema.string({}, [
      rules.exists({ table: Symptoms.table, column: "id" }),
    ]),
  });
}
