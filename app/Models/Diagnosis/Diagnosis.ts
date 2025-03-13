import { DateTime } from "luxon";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
} from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import User from "../User/User";
import Disease from "../Master/Disease";

export default class Diagnosis extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public user_id: string;

  @column()
  public disease_id: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;

  static get table() {
    return "diagnosis.diagnosis";
  }

  @beforeCreate()
  public static setUUID(data: Diagnosis) {
    const namespace = uuidv4();
    data.id = uuidv5("Diagnosis", namespace);
  }

  @belongsTo(() => User, {
    foreignKey: "user_id",
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Disease, {
    foreignKey: "disease_id",
  })
  public disease: BelongsTo<typeof Disease>;
}
