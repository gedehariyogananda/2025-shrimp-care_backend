import BaseService from "App/Base/Services/BaseService"
import DiagnosisRepository from "App/Repositories/Diagnosis/DiagnosisRepository"

export default class DiagnosisService extends BaseService {
  constructor() {
    super(new DiagnosisRepository())
  }
}
    