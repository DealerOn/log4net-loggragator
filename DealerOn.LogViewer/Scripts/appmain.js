//Create app
app = angular.module('logviewer', []);

//Setup Providers
app.
  factory('DataProvider', function () { return new dataprovider(); });

//Setup Routing
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  var entriesPage = { templateUrl: '/Templates/entries.html', controller: EntriesController };
  var exceptionsPage = { templateUrl: '/Templates/exceptions.html', controller: ExceptionsController };
  var requestsPage = { templateUrl: '/Templates/requests.html', controller: RequestsController };
  var chartsPage = { templateUrl: '/Templates/charts.html', controller: ChartsController };

  $routeProvider.when('/', entriesPage);
  $routeProvider.when('/entries/', entriesPage);
  $routeProvider.when('/entries/:id', entriesPage);
  $routeProvider.when('/exceptions/', exceptionsPage);
  $routeProvider.when('/exceptions/:id', exceptionsPage);
  $routeProvider.when('/exceptions/entry/:entryid', exceptionsPage);
  $routeProvider.when('/http/', requestsPage);
  $routeProvider.when('/http/:id', requestsPage);
  $routeProvider.when('/charts/', chartsPage),
  $routeProvider.otherwise(entriesPage);
});