import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.delete('/', 'Diagnosis/DiagnosisController.destroyAll').as('diagnosis.destroyAll')
}).prefix('diagnosis')
Route.resource('diagnosis', 'Diagnosis/DiagnosisController').apiOnly()
Route.post('set/disease-shrimp', 'Diagnosis/DiagnosisController.setDiseaseShrimp').middleware(['auth'])

