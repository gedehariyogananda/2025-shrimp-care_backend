import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import Diagnosis from "./Diagnosis";
import Symptoms from "./Symptoms";

export default class DiagnosisDetail extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public diagnosis_id: string;

  @column()
  public symptom_id: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "diagnosis.diagnosis_detail";
  }

  @beforeCreate()
  public static setUUID(data: DiagnosisDetail) {
    const namespace = uuidv4();
    data.id = uuidv5("DiagnosisDetail", namespace);
  }

  @belongsTo(() => Diagnosis, {
    foreignKey: "diagnosis_id",
  })
  public diagnosis: BelongsTo<typeof Diagnosis>;

  @belongsTo(() => Symptoms, {
    foreignKey: "symptom_id",
  })
  public symptom: BelongsTo<typeof Symptoms>;
}
