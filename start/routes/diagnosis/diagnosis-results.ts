import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.delete('/', 'Diagnosis/DiagnosisResultController.destroyAll').as('diagnosis-results.destroyAll')
}).prefix('diagnosis-results')
Route.resource('diagnosis-results', 'Diagnosis/DiagnosisResultController').apiOnly()
