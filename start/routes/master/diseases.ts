import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.delete('/', 'Master/DiseaseController.destroyAll').as('diseases.destroyAll')
}).prefix('diseases')
Route.resource('diseases', 'Master/DiseaseController').apiOnly()
