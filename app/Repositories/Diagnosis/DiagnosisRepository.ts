import Database, {
  TransactionClientContract,
} from "@ioc:Adonis/Lucid/Database";
import BaseRepository from "App/Base/Repositories/BaseRepository";
import Diagnosis from "App/Models/Diagnosis/Diagnosis";

export default class DiagnosisRepository extends BaseRepository {
  constructor() {
    super(Diagnosis);
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

  public async updateTrx(
    id: string,
    data: any,
    trx: TransactionClientContract
  ) {
    return await Database.from("diagnosis.diagnosis")
      .where("id", id)
      .useTransaction(trx)
      .update(data);
  }
}
