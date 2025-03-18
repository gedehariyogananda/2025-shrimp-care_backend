import BaseRepository from "App/Base/Repositories/BaseRepository";
import Symptoms from "App/Models/Diagnosis/Symptoms";

export default class SymptomsRepository extends BaseRepository {
  constructor() {
    super(Symptoms);
  }

  async findByCodeSymptom(code: string): Promise<Symptoms | null> {
    return await this.model.query().where("code_symptom", code).first();
  }
}
