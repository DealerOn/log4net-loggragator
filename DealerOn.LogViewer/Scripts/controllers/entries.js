function EntriesController($scope, $routeParams, DataProvider) {
  var basequery = DataProvider.NewEntriesQuery();
  $scope.entries = undefined;
  if ($routeParams.id == undefined) {
    var search = function (query) {
      var newquery = query;
      if ($scope.loggername != undefined && $scope.loggername != "Any") {
        newquery = newquery.where("LoggerName", "==", $scope.loggername);
      }
      if ($scope.level != undefined && $scope.level != "Any") {
        newquery = newquery.where("Level", "==", $scope.level);
      }
      if ($scope.startdate != undefined) {
        newquery = newquery.where("TimeStamp", ">", $scope.startdate);
      }
      if ($scope.enddate != undefined) {
        newquery = newquery.where("TimeStamp", "<", $scope.enddate);
      }
      if ($scope.message != undefined) {
        newquery = newquery.where("Message", "Contains", $scope.message);
      }
      if ($scope.thread != undefined) {
        newquery = newquery.where("Thread", "==", $scope.thread);
      }
      if ($scope.request == true) {
        newquery = newquery.where("RequestInfo", "!=", null);
      }
      if ($scope.host != undefined && $scope.host) {
        newquery = newquery.where("Host", "==", $scope.host);
      }
      //Forces proper serialziation
      return newquery.select("RequestInfo, LoggerName, TimeStamp, Message, Thread, Host, Exceptions, Level, Id").orderBy("Id desc");
    };
    var resetsearch = function () {
      $scope.loggername = undefined;
      $scope.level = undefined;
      $scope.startdate = undefined;
      $scope.enddate = undefined;
      $scope.message = undefined;
      $scope.thread = undefined;
      $scope.request = undefined;
      $scope.host = undefined;
    };

    $scope.perpage = 30;
    setupPagedController(basequery, $scope, DataProvider, search, resetsearch);
    
    $scope.loglevels = undefined;
    DataProvider.NewLevelsQuery().execute().then(function (data) {
      $scope.loglevels = data.results;
      $scope.loglevels.unshift("Any");
      $scope.$apply();
    });

    $scope.loggernames = undefined;
    DataProvider.NewLoggerNamesQuery().execute().then(function (data) {
      $scope.loggernames = data.results;
      $scope.loggernames.unshift("Any");
      $scope.$apply();
    });
    
    $scope.hostnames = undefined;
    DataProvider.NewHostNamesQuery().execute().then(function (data) {
      $scope.hostnames = data.results;
      $scope.hostnames.unshift("Any");
      $scope.$apply();
    });
  } else {
    basequery = basequery.where("Id", "==", parseInt($routeParams.id, 10));
    
    basequery.execute().then(function (data) {
      $scope.entry = data.results[0];
      $scope.request = data.results[0].RequestInfo;
      $scope.exceptions = data.results[0].Exceptions;
      $scope.$apply();
    });
  }
}