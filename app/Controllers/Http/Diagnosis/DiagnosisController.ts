import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DiagnosisService from "App/Services/Diagnosis/DiagnosisService";
import CreateDiagnosisValidator from "App/Validators/Diagnosis/CreateDiagnosisValidator";
import UpdateDiagnosisValidator from "App/Validators/Diagnosis/UpdateDiagnosisValidator";
import { ValidationException } from "@ioc:Adonis/Core/Validator";

export default class DiagnosisController {
  service = new DiagnosisService();
  FETCHED_ATTRIBUTE = [
    "user_id",
    "best_disease_id",
    "threshold",
    "best_percentage_disease",
  ];

  public async index({ request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all());
      const result = await this.service.getAll(options);
      return response.api(result, "OK", 200, request);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      await request.validate(CreateDiagnosisValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      const result = await this.service.store(data);
      return response.api(result, "Diagnosis created!", 201);
    } catch (error) {
      if (error instanceof ValidationException) {
        const errorValidation: any = error;
        return response.error(
          errorValidation.message,
          errorValidation.messages.errors,
          422
        );
      }
      return response.error(error.message);
    }
  }

  public async show({ params, request, response }: HttpContextContract) {
    try {
      const options = request.parseParams(request.all());
      const result = await this.service.show(params.id, options);
      if (!result) {
        return response.api(null, `Diagnosis with id: ${params.id} not found`);
      }
      return response.api(result);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateDiagnosisValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      const result = await this.service.update(params.id, data);
      if (!result) {
        return response.api(null, `Diagnosis with id: ${params.id} not found`);
      }
      return response.api(result, "Diagnosis updated!");
    } catch (error) {
      if (error instanceof ValidationException) {
        const errorValidation: any = error;
        return response.error(
          errorValidation.message,
          errorValidation.messages.errors,
          422
        );
      }
      return response.error(error.message);
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const result = await this.service.delete(params.id);
      if (!result) {
        return response.api(null, `Diagnosis with id: ${params.id} not found`);
      }
      return response.api(null, "Diagnosis deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async destroyAll({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll();
      return response.api(null, "All Diagnosis deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async setDiseaseShrimp({ auth, request, response }: HttpContextContract) {
    try {
      const { symtoms, threshold } = request.only(["symtoms", "threshold"]);

      const result = await this.service.setDisease(symtoms, threshold, auth.user?.id);
      return response.api(result, "OK", 200, request);
    } catch (error) {
      return response.error(error.message);
    }
  }
}
