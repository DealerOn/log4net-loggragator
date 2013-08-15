function setupPagedController(basequery, $scope, DataProvider, Search, ResetSearch) {
  $scope.data = undefined;
  $scope.page = 1;

  var lastquery;

  $scope.NextPage = function () {
    $scope.page++;
    apply(lastquery);
  };
  $scope.PrevPage = function () {
    $scope.page--;
    apply(lastquery);
  };

  $scope.Search = function () {
    $scope.page = 1;
    apply(Search(basequery));
  };

  $scope.ResetSearch = function() {
    ResetSearch();
    $scope.Search();
  };
  var apply = function (querya) {
    $scope.opacity = 0.5;
    lastquery = querya;
    var pagequery = lastquery
      .skip($scope.perpage * ($scope.page - 1))
      .take($scope.perpage)
      .inlineCount(true);

    pagequery.execute().then(function (data) {
      $scope.opacity = 1;
      $scope.data = data.results;
      $scope.inlineCount = data.inlineCount;
      $scope.lastpage = Math.ceil($scope.inlineCount / $scope.perpage);
      $scope.last = Math.min((($scope.page) * $scope.perpage) + 1, $scope.inlineCount);
      $scope.$apply();
    });
  };

  $scope.Search();
}
