import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SymptomsService from "App/Services/Diagnosis/SymptomsService";
import CreateSymptomsValidator from "App/Validators/Diagnosis/CreateSymptomsValidator";
import UpdateSymptomsValidator from "App/Validators/Diagnosis/UpdateSymptomsValidator";
import { ValidationException } from "@ioc:Adonis/Core/Validator";

export default class SymptomsController {
  service = new SymptomsService();
  FETCHED_ATTRIBUTE = [
    "code_symptom",
    "name_symptom",
    "keyword_symptom",
    "description",
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
      await request.validate(CreateSymptomsValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      const result = await this.service.store(data);
      return response.api(result, "Symptoms created!", 201);
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
        return response.api(null, `Symptoms with id: ${params.id} not found`);
      }
      return response.api(result);
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      await request.validate(UpdateSymptomsValidator);
      const data = request.only(this.FETCHED_ATTRIBUTE);
      const result = await this.service.update(params.id, data);
      if (!result) {
        return response.api(null, `Symptoms with id: ${params.id} not found`);
      }
      return response.api(result, "Symptoms updated!");
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
        return response.api(null, `Symptoms with id: ${params.id} not found`);
      }
      return response.api(null, "Symptoms deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }

  public async destroyAll({ response }: HttpContextContract) {
    try {
      await this.service.deleteAll();
      return response.api(null, "All Symptoms deleted!");
    } catch (error) {
      return response.error(error.message);
    }
  }
}
