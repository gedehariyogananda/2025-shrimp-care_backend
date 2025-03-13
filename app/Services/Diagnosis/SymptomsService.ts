import BaseService from "App/Base/Services/BaseService"
import SymptomsRepository from "App/Repositories/Diagnosis/SymptomsRepository"

export default class SymptomsService extends BaseService {
  constructor() {
    super(new SymptomsRepository())
  }
}
    