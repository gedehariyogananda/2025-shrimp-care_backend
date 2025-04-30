import Database from "@ioc:Adonis/Lucid/Database";
import BaseService from "App/Base/Services/BaseService";
import DefaultException from "App/Exceptions/DefaultException";
import { FormatterHelper } from "App/Helper/FormatterHelper";
import DiagnosisDetailRepository from "App/Repositories/Diagnosis/DiagnosisDetailRepository";
import DiagnosisRepository from "App/Repositories/Diagnosis/DiagnosisRepository";
import DiagnosisResultRepository from "App/Repositories/Diagnosis/DiagnosisResultRepository";
import InferenceRuleRepository from "App/Repositories/Diagnosis/InferenceRuleRepository";
import SymptomsRepository from "App/Repositories/Diagnosis/SymptomsRepository";
import DiseaseRepository from "App/Repositories/Master/DiseaseRepository";

export default class DiagnosisService extends BaseService {
  constructor() {
    super(new DiagnosisRepository());
  }

  symtomsRepository = new SymptomsRepository();
  inferenceRulesRepository = new InferenceRuleRepository();
  diseaseRepository = new DiseaseRepository();
  diagnosisResultRepository = new DiagnosisResultRepository();
  diagnosisDetailRepository = new DiagnosisDetailRepository();

  async setDisease(
    symtoms: string[],
    threshold: number,
    authID: string | undefined
  ): Promise<any> {
    let trx = await Database.transaction();
    try {
      const diagnosisInit = await this.repository.storeTrx(
        {
          user_id: authID,
          threshold: threshold,
        },
        trx
      );

      let symtomsID = [] as string[];
      for (const symtomCode of symtoms) {
        const sypmtom = await this.symtomsRepository.findByCodeSymptom(
          symtomCode
        );

        if (sypmtom) {
          symtomsID.push(sypmtom.id);
        } else {
          throw new DefaultException("Gejala tidak ditemukan!", 400);
        }
      }

      const matchingDiseases =
        await this.inferenceRulesRepository.findBySymptomId(symtomsID);

      if (matchingDiseases.length === 0) {
        throw new DefaultException("Tidak ada penyakit yang cocok!", 400);
      }

      let diseaseMap: Record<
        string,
        {
          disease_id: string;
          match_count: number;
          max_symptoms: number;
          symptom_ids: string[];
        }
      > = {};

      for (const entry of matchingDiseases) {
        const { disease_id, symptom_id } = entry;

        if (!diseaseMap[disease_id]) {
          const diseaseData = await this.diseaseRepository.find(disease_id);
          if (!diseaseData) continue;

          diseaseMap[disease_id] = {
            disease_id: disease_id,
            match_count: 0,
            max_symptoms: diseaseData.max_symptoms,
            symptom_ids: [],
          };
        }

        diseaseMap[disease_id].symptom_ids.push(symptom_id);
        diseaseMap[disease_id].match_count++;
      }

      let bestDisease: {
        disease_id: string;
        match_count: number;
        max_symptoms: number;
        symptom_ids: string[];
      } | null = null;

      let highestPercentage = 0;

      for (const diseaseID in diseaseMap) {
        const disease = diseaseMap[diseaseID];

        const percentage = (disease.match_count / disease.max_symptoms) * 100;

        if (percentage > highestPercentage) {
          highestPercentage = percentage;
          bestDisease = disease;
        }

        // set history
        if (percentage > threshold) {
          const detailResult = await this.diagnosisResultRepository.storeTrx(
            {
              diagnosis_id: diagnosisInit.id,
              disease_id: disease.disease_id,
              percentage: percentage,
            },
            trx
          );

          for (const symptomID of disease.symptom_ids) {
            await this.diagnosisDetailRepository.storeTrx(
              {
                diagnosis_result_id: detailResult.id,
                symptom_id: symptomID,
              },
              trx
            );
          }
        }
      }

      if (bestDisease && highestPercentage >= threshold) {
        const result = await this.diseaseRepository.find(
          bestDisease.disease_id
        );
        if (!result) {
          throw new DefaultException("Penyakit tidak ditemukan!", 400);
        }

        // update main diagnosis init
        await this.repository.updateTrx(
          diagnosisInit.id,
          {
            best_disease_id: bestDisease.disease_id,
            best_percentage_disease: highestPercentage,
          },
          trx
        );

        trx.commit();

        return {
          diagnosis_id: diagnosisInit.id,
          disease_id: bestDisease.disease_id,
          disease_name: result.name_disease,
          confidence: FormatterHelper.percentage(highestPercentage),
        };
      } else {
        trx.rollback();
        throw new DefaultException(
          "Tidak ada penyakit yang memenuhi threshold!",
          400
        );
      }
    } catch (error) {
      trx.rollback();
      throw error;
    }
  }
}
