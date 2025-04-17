import { TransactionClientContract } from "@ioc:Adonis/Lucid/Database";
import BaseRepository from "App/Base/Repositories/BaseRepository";
import DiagnosisDetail from "App/Models/Diagnosis/DiagnosisDetail";

export default class DiagnosisDetailRepository extends BaseRepository {
  constructor() {
    super(DiagnosisDetail);
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
