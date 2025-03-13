import BaseService from "App/Base/Services/BaseService"
import InferenceRuleRepository from "App/Repositories/Diagnosis/InferenceRuleRepository"

export default class InferenceRuleService extends BaseService {
  constructor() {
    super(new InferenceRuleRepository())
  }
}
    