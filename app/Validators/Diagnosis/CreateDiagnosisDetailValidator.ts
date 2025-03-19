import { schema, validator, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Diagnosis from "App/Models/Diagnosis/Diagnosis";
import Symptoms from "App/Models/Diagnosis/Symptoms";
import DiagnosisResult from "App/Models/Diagnosis/DiagnosisResult";

export default class CreateDiagnosisDetailValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api;

  public schema = schema.create({
    diagnosis_result_id: schema.string({}, [
      rules.exists({ table: DiagnosisResult.table, column: "id" }),
    ]),
    symptom_id: schema.string({}, [
      rules.exists({ table: Symptoms.table, column: "id" }),
    ]),
  });
}
