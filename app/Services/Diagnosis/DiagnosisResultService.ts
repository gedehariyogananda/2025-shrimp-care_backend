import BaseService from "App/Base/Services/BaseService"
import DiagnosisResultRepository from "App/Repositories/Diagnosis/DiagnosisResultRepository"

export default class DiagnosisResultService extends BaseService {
  constructor() {
    super(new DiagnosisResultRepository())
  }
}
    