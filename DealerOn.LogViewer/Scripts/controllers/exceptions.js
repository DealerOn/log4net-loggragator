function ExceptionsController($scope, $routeParams, DataProvider) {
  var basequery = DataProvider.NewExceptionsQuery();
  $scope.exceptions = undefined;
  if ($routeParams.entryid != undefined) {
    basequery = basequery.where("LogEntryId", "==", parseInt($routeParams.entryid, 10));
    basequery.execute().then(function(data) {
      $scope.exceptions = data.results;
      $scope.$apply();
    });
  } else {
    var search = function (query) {
      var newquery = query;
      if ($scope.type != undefined && $scope.type != "Any") {
        newquery = newquery.where("Type", "==", $scope.type);
      }
      if ($scope.site != undefined && $scope.site != "Any") {
        newquery = newquery.where("TargetSite", "==", $scope.site);
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
      if ($scope.source != undefined && $scope.source != "Any") {
        newquery = newquery.where("Source", "==", $scope.source);
      }
      if ($scope.trace != undefined) {
        newquery = newquery.where("StackTrace", "Contains", $scope.trace);
      }
      return newquery;
    };
    var resetsearch = function () {
      $scope.type = undefined;
      $scope.site = undefined;
      $scope.message = undefined;
      $scope.source = undefined;
      $scope.trace = undefined;
    };

    $scope.perpage = 4;
    setupPagedController(basequery.orderBy("TimeStamp desc"), $scope, DataProvider, search, resetsearch);

    $scope.extypes = undefined;
    DataProvider.NewExceptionsTypesQuery().execute().then(function (data) {
      $scope.extypes = data.results;
      $scope.extypes.unshift("Any");
      $scope.$apply();
    });
    $scope.targetsites = undefined;
    DataProvider.NewExceptionsTargetSiteQuery().execute().then(function (data) {
      $scope.targetsites = data.results;
      $scope.targetsites.unshift("Any");
      $scope.$apply();
    });
    $scope.exsources = undefined;
    DataProvider.NewExceptionsSourceQuery().execute().then(function (data) {
      $scope.exsources = data.results;
      $scope.exsources.unshift("Any");
      $scope.$apply();
    });
  }
}