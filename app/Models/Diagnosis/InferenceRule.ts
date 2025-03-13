import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import Disease from "../Master/Disease";
import Symptoms from "./Symptoms";

export default class InferenceRule extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public disease_id: string;

  @column()
  public symptom_id: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "diagnosis.inference_rules";
  }

  @beforeCreate()
  public static setUUID(data: InferenceRule) {
    const namespace = uuidv4();
    data.id = uuidv5("InferenceRule", namespace);
  }

  @belongsTo(() => Disease, {
    foreignKey: "disease_id",
  })
  public disease: BelongsTo<typeof Disease>;

  @belongsTo(() => Symptoms, {
    foreignKey: "symptom_id",
  })
  public symptom: BelongsTo<typeof Symptoms>;
}
