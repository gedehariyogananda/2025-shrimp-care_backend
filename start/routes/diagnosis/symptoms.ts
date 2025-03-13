import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.delete('/', 'Diagnosis/SymptomsController.destroyAll').as('symptoms.destroyAll')
}).prefix('symptoms')
Route.resource('symptoms', 'Diagnosis/SymptomsController').apiOnly()
