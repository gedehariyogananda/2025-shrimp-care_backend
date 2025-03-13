import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'

export default class Symptoms extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public code_symptom: string

  @column()
  public name_symptom: string

  @column()
  public keyword_symptom: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "diagnosis.symptom" 
  }

  @beforeCreate()
  public static setUUID(data: Symptoms) {
    const namespace = uuidv4()
    data.id = uuidv5('Symptoms', namespace)
  }
}
