import BaseRepository from "App/Base/Repositories/BaseRepository";
import InferenceRule from "App/Models/Diagnosis/InferenceRule";

export default class InferenceRuleRepository extends BaseRepository {
  constructor() {
    super(InferenceRule);
  }

  async findBySymptomId(symptomId: string[]): Promise<InferenceRule[]> {
    return await this.model
      .query()
      .whereIn("symptom_id", symptomId);
  }
}
