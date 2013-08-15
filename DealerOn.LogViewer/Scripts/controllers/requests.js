function RequestsController($scope, $routeParams, DataProvider) {
  var basequery = DataProvider.NewRequestsQuery();
  if ($routeParams.id != undefined) {
    $scope.request = undefined;
    basequery = basequery.where("Id", "==", parseInt($routeParams.id));
    basequery.execute().then(function (data) {
      $scope.request = data.results[0];
      $scope.$apply();
    });
  } else {
    var search = function (query) {
        var newquery = query;
        if ($scope.script != undefined && $scope.script != "Any") {
          newquery = newquery.where("ScriptName", "==", $scope.script);
        }
        if ($scope.host != undefined && $scope.host != "Any") {
          newquery = newquery.where("Host", "==", $scope.host);
        }
        if ($scope.address != undefined) {
          newquery = newquery.where("RemoteAddress", "Contains", $scope.address);
        }
        if ($scope.startdate != undefined) {
          newquery = newquery.where("TimeStamp", ">", $scope.startdate);
        }
        if ($scope.enddate != undefined) {
          newquery = newquery.where("TimeStamp", "<", $scope.enddate);
        }
        if ($scope.referer != undefined) {
          newquery = newquery.where("Referer", "Contains", $scope.referer);
        }
        if ($scope.query != undefined) {
          newquery = newquery.where("QueryString", "Contains", $scope.query);
        }
        if ($scope.url != undefined) {
          newquery = newquery.where("Url", "Contains", $scope.url);
        }
        if ($scope.agent != undefined) {
          newquery = newquery.where("UserAgent", "Contains", $scope.agent);
        }
        return newquery;
      };
    var resetsearch = function () {
      $scope.script = undefined;
      $scope.address = undefined;
      $scope.host = undefined;
      $scope.referer = undefined;
      $scope.query = undefined;
      $scope.url = undefined;
      $scope.agent = undefined;
    };

    $scope.perpage = 5;
    setupPagedController(basequery.orderBy("Id desc"), $scope, DataProvider, search, resetsearch);
    $scope.Set = function (item, value) {
      var b = "$scope." + item + " = '" + value + "'";
      eval(b);
    };
    
    $scope.scriptnames = undefined;
    DataProvider.NewRequestScriptNamesQuery().execute().then(function (data) {
      $scope.scriptnames = data.results;
      $scope.scriptnames.unshift("Any");
      $scope.$apply();
    });
    
    $scope.hosts = undefined;
    DataProvider.NewRequestHostsQuery().execute().then(function (data) {
      $scope.hosts = data.results;
      $scope.hosts.unshift("Any");
      $scope.$apply();
    });
  }
}