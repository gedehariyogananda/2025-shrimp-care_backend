import BaseRepository from "App/Base/Repositories/BaseRepository";
import InferenceRule from "App/Models/Diagnosis/InferenceRule";

export default class InferenceRuleRepository extends BaseRepository {
  constructor() {
    super(InferenceRule)
  }
}
    