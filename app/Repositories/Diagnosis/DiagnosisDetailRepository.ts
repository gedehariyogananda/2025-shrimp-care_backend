import BaseRepository from "App/Base/Repositories/BaseRepository";
import DiagnosisDetail from "App/Models/Diagnosis/DiagnosisDetail";

export default class DiagnosisDetailRepository extends BaseRepository {
  constructor() {
    super(DiagnosisDetail)
  }
}
    