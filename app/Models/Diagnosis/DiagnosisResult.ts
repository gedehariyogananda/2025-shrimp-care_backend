import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Diagnosis from "./Diagnosis";
import Disease from "../Master/Disease";
import DiagnosisDetail from "./DiagnosisDetail";

export default class DiagnosisResult extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public diagnosis_id: string;

  @column()
  public disease_id: string;

  @column()
  public percentage: number;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "diagnosis.diagnosis_result";
  }

  @belongsTo(() => Diagnosis, {
    foreignKey: "diagnosis_id",
  })
  public diagnosis: BelongsTo<typeof Diagnosis>;

  @belongsTo(() => Disease, {
    foreignKey: "disease_id",
  })
  public disease: BelongsTo<typeof Disease>;

  @hasMany(() => DiagnosisDetail, {
    foreignKey: "diagnosis_result_id",
  })
  public diagnosisDetail: HasMany<typeof DiagnosisDetail>;
}
