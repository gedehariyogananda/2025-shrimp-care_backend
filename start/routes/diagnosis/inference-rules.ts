import Route from '@ioc:Adonis/Core/Route'

Route.group(function () {
  Route.delete('/', 'Diagnosis/InferenceRuleController.destroyAll').as('inference-rules.destroyAll')
}).prefix('inference-rules')
Route.resource('inference-rules', 'Diagnosis/InferenceRuleController').apiOnly()
