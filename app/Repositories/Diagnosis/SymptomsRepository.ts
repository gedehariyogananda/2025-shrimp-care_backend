import BaseRepository from "App/Base/Repositories/BaseRepository";
import Symptoms from "App/Models/Diagnosis/Symptoms";

export default class SymptomsRepository extends BaseRepository {
  constructor() {
    super(Symptoms)
  }
}
    