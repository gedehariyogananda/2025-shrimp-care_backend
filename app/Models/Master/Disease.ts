import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import Symptoms from "../Diagnosis/Symptoms";

export default class Disease extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public code_disease: string;

  @column()
  public name_disease: string;

  @column()
  public image_disease: string;

  @column()
  public risk_level: number;

  @column()
  public description: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "masters.disease";
  }

  @beforeCreate()
  public static setUUID(data: Disease) {
    const namespace = uuidv4();
    data.id = uuidv5("Disease", namespace);
  }

  @hasMany(() => Disease, {
    foreignKey: "disease_id",
  })
  public disease: HasMany<typeof Disease>;

  @hasMany(() => Symptoms, {
    foreignKey: "symptom_id",
  })
  public symptom: HasMany<typeof Symptoms>;
}
