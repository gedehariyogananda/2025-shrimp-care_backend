import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import Diagnosis from '../Diagnosis/Diagnosis'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public employment: string

  @column()
  public roles: string

  @column()
  public google_id: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  static get table() {
    return "user.user" 
  }

  @beforeCreate()
  public static async setUUID(data: User) {
    const namespace = uuidv4()
    data.id = uuidv5('User', namespace)
    if (data.password) {
      data.password = await Hash.make(data.password)
    }
  }

  @hasMany(() => Diagnosis, {
    foreignKey: 'user_id',
  })

  public diagnosis: HasMany<typeof Diagnosis>
}
