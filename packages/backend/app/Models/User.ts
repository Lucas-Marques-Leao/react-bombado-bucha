import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, computed } from '@ioc:Adonis/Lucid/Orm'
import IUser from '@react-bombado-bucha/shared/interfaces/IUser'

export default class User extends BaseModel implements IUser {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public photoUrl?: string

  @column()
  public provider: string

  @computed()
  public get hasPassword() {
    return !!this.password
  }

  @column()
  public providerId?: string

  @column({ serializeAs: null })
  public password?: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      if (user.password) {
        user.password = await Hash.make(user.password)
      }
    }
  }
}
