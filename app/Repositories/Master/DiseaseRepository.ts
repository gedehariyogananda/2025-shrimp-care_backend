import BaseRepository from "App/Base/Repositories/BaseRepository";
import Disease from "App/Models/Master/Disease";

export default class DiseaseRepository extends BaseRepository {
  constructor() {
    super(Disease)
  }
}
    