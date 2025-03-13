import BaseService from "App/Base/Services/BaseService"
import DiseaseRepository from "App/Repositories/Master/DiseaseRepository"

export default class DiseaseService extends BaseService {
  constructor() {
    super(new DiseaseRepository())
  }
}
    