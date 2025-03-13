import BaseService from "App/Base/Services/BaseService"
import DiagnosisDetailRepository from "App/Repositories/Diagnosis/DiagnosisDetailRepository"

export default class DiagnosisDetailService extends BaseService {
  constructor() {
    super(new DiagnosisDetailRepository())
  }
}
    