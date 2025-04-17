import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import BaseRepository from "App/Base/Repositories/BaseRepository";
import DiagnosisResult from "App/Models/Diagnosis/DiagnosisResult";

export default class DiagnosisResultRepository extends BaseRepository {
  constructor() {
    super(DiagnosisResult);
  }

  public async storeTrx(
    data: any,
    trx: TransactionClientContract
  ): Promise<any> {
    try {
      const stored = await trx
        .insertQuery()
        .table(this.model.table)
        .insert(data)
        .returning("*");

      return stored[0];
    } catch (error) {
      throw error;
    }
  }
}
