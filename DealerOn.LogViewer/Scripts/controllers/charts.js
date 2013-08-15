function ChartsController($scope, $routeParams, DataProvider) {
  $scope.startdate = addDay(new Date(), -1).toLocaleString();
  $scope.enddate = new Date().toLocaleString();

  var update = function () {
    var start = $scope.startdate.toLocaleString();
    var finish = $scope.enddate.toLocaleString();
    $scope.loading = true;
    DataProvider.NewAggregateEntriesQuery(start, finish).execute().then(function (data) {
      var aggregate = data.results;
      var results = [];

      var first = true;
      var firstdate = new Date();

      for (var i in aggregate) {
        var seriesData = [];
        var values = aggregate[i].Value;
        for (var j in values) {
          var date = new Date(Date.parse(j));
          date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
          seriesData.push(values[j]);
          if (first) {
            firstdate = date;
          }
          first = false;
        }
        results.push({
          name: aggregate[i].Key,
          data: seriesData,
          pointStart: firstdate.getTime(),
          pointInterval: 3600 * 1000,
        });
      }
      $scope.series = results;
      $scope.xaxis = {
        type: "datetime",
        dateTimeLabelFormats: {
          hour: "%l:%M %p",
        }
      };

      $scope.loading = false;
      $scope.$apply();
    });
  };

  $scope.$watch("enddate", update);
  $scope.$watch("startdate", update);
}

function addDay(date, num) {
  return new Date(new Date().setDate(date.getDate() + num));
}