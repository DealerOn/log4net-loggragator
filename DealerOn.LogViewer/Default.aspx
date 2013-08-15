<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="logviewer">
<head>
  <title>Log Viewer</title>

  <!-- Libraries -->
  <script src="/Scripts/lib/q/q.js"></script>
  <script src="/Scripts/lib/jquery/jquery-1.8.3.js"></script>
  <script src="/Scripts/lib/angular-1.0.7/angular.js"></script>
  <script src="/Scripts/lib/breeze/breeze.debug.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="/Scripts/lib/jquery/jquery-ui-timepicker-addon.js"></script>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <link rel="stylesheet" href="http://trentrichardson.com/examples/timepicker/jquery-ui-timepicker-addon.css" />
  
  <script src="/Scripts/lib/highcharts/highcharts.js"></script>
  <script src="/Scripts/lib/highcharts/highcharts-more.js"></script>

  <!-- Data -->
  <script src="/Scripts/data/dataprovider.js"></script>
  <script src="/Scripts/data/pagedcontrollerhelper.js"></script>

  <!-- App Main -->
  <script src="/Scripts/appmain.js"></script>
  <script src="/Scripts/directives.js"></script>

  <!-- Controllers -->
  <script src="/Scripts/controllers/entries.js"></script>
  <script src="/Scripts/controllers/exceptions.js"></script>
  <script src="/Scripts/controllers/requests.js"></script>
  <script src="/Scripts/controllers/charts.js"></script>

  <!-- Styles -->
  <style>
    .content {
      width: 90%;
      margin-left: 5%;
    }

    .mainbar {
      background: darkgray;
      padding: 5px;
      padding-top: 20px;
      padding-bottom: 20px;
    }

      .mainbar a {
        border-radius: 6px;
        padding: 5px;
        border: 1px solid lightcyan;
        background-color: rgb(239, 239, 239);
        text-decoration: none;
        color: #000000;
      }

        .mainbar a:hover {
          border: 1px solid yellow;
        }

    .topbar {
      border-radius: 25px;
      padding-top: 10px;
      background-color: #444;
      color: whitesmoke;
    }

      .topbar h2 {
        padding-left: 20px;
      }

    .maindata {
      background-color: white;
    }

    body {
      background-color: #edfbff;
    }

    .exceptiondata {
      border: 1px solid lightgray;
      padding-left: 10px;
    }

    .requestdata {
      border: 1px solid lightgray;
      padding-left: 10px;
    }

    .entrydata {
      border: 1px solid lightgray;
      padding-left: 10px;
    }

    .wrap {
      white-space: pre-wrap;
      word-wrap: break-word;
      word-break: break-all;
    }

    .tr-even {
      background-color: #f1f1f1;
    }
    
    .tr-odd {
      background-color: #fcfcfc;
    }
  </style>

</head>
<body>
  <div class="content">
    <div class="contentinner">
      <div class="topbar">
        <h2>Log Viewer</h2>
        <div class="mainbar">
          <a href="/">Entries</a>
          <a href="/exceptions/">Exceptions</a>
          <a href="/http/">HTTP Requests</a>
          <a href="/charts/">Charts</a>
        </div>
      </div>
      <div ng-view="" class="maindata" />
    </div>
  </div>
</body>
</html>
