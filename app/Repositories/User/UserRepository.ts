import BaseRepository from "App/Base/Repositories/BaseRepository";
import User from "App/Models/User/User";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User)
  }

  async findByEmail(email: string) : Promise<User | null> {
    return await User.query().where('email', email).first()
  }
}
    