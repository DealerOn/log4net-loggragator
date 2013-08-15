app.directive('datepicker', function () {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      $(function () {
        element.datetimepicker({
          dateFormat: 'm/d/yy',
          timeFormat: 'hh:mm:ss TT',
          onSelect: function () {
            var date = element.datetimepicker('getDate');
            date.setHours(date.getHours() - (date.getTimezoneOffset() / 60));
            ngModelCtrl.$setViewValue(date);
            scope.$apply();
          }
        });
      });
    }
  };
});
app.directive('expandtext', function () {
  return {
    restrict: 'A',
    scope: {
      model: "=",
    },
    templateUrl: '/Templates/Partials/expandtext.html',
  };
});
var chart;
app.directive('highcharts', function () {
  return {
    restrict: 'EA',
    replace: "true",
    scope: {
      series: "=",
      type: "=",
      charttitle: "=",
      xaxis: "=",
      loading: "=",
    },
    template: '<div id="container"></div>',
    link: function (scope, element, attrs) {
      var chartData = {
        chart: {
          renderTo: 'container',
          type: scope.type,
          zoomType: 'x',
        },
        title: {
          text: scope.title,
        },
        xAxis: scope.xaxis,
        plotOptions: {
          pie: {
            allowPointSelect: true,
          },
        },
        tooltip: {
          crosshairs: true,
          shared: true,
          xDateFormat: '%A, %B %e, %l:%M %p'
        },
        series: scope.series
      };

      chart = new Highcharts.Chart(chartData);

      scope.$watch("charttitle", function (newValue) {
        chartData.title.text = newValue;
        chart = new Highcharts.Chart(chartData);
      });
      scope.$watch("series", function (newValue) {
        chartData.series = newValue;
        chart = new Highcharts.Chart(chartData);
      });
      scope.$watch("type", function (newValue) {
        chartData.chart.type = newValue;
        chart = new Highcharts.Chart(chartData);
      });
      scope.$watch("xaxis", function (newValue) {
        if (newValue != undefined) {
          chartData.xAxis = newValue;
          chart = new Highcharts.Chart(chartData);
        }
      });
      scope.$watch("loading", function(newValue) {
        if (newValue) {
          chart.showLoading();
        } else {
          chart.hideLoading();
        }
      });
    },
  };
});