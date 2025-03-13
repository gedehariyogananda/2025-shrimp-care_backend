import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.delete('/', 'Diagnosis/DiagnosisDetailController.destroyAll').as('diagnosis-details.destroyAll')
}).prefix('diagnosis-details')
Route.resource('diagnosis-details', 'Diagnosis/DiagnosisDetailController').apiOnly()
