import BaseRepository from "App/Base/Repositories/BaseRepository";
import Diagnosis from "App/Models/Diagnosis/Diagnosis";

export default class DiagnosisRepository extends BaseRepository {
  constructor() {
    super(Diagnosis)
  }
}
    