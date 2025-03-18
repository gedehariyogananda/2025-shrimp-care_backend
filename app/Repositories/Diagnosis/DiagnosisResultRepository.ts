import BaseRepository from "App/Base/Repositories/BaseRepository";
import DiagnosisResult from "App/Models/Diagnosis/DiagnosisResult";

export default class DiagnosisResultRepository extends BaseRepository {
  constructor() {
    super(DiagnosisResult)
  }
}
    