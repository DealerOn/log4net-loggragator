dataprovider = function () {
  breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true);
  this.serviceName = "/breeze";

  this.dataService = new breeze.DataService({
    serviceName: this.serviceName,
    hasServerMetadata: false,
  });

  this.manager = new breeze.EntityManager({ dataService: this.dataService });
};

dataprovider.prototype = {
  //Entries
  NewEntriesQuery: function () {
    return breeze.EntityQuery.from("LogEntry/Entries").using(this.manager);
  },
  NewLevelsQuery: function() {
    return breeze.EntityQuery.from("LogEntry/Levels").using(this.manager);
  },
  NewLoggerNamesQuery: function () {
    return breeze.EntityQuery.from("LogEntry/LoggerNames").using(this.manager);
  },
  NewHostNamesQuery: function () {
    return breeze.EntityQuery.from("LogEntry/HostNames").using(this.manager);
  },
  NewAggregateEntriesQuery: function(begin, end) {
    return breeze.EntityQuery.from("LogEntry/AggregateEntriesByLevel").using(this.manager).withParameters({ startstr: begin, finishstr: end });
  },
  
  //Requests
  NewRequestsQuery: function () {
    return breeze.EntityQuery.from("Request/Requests").using(this.manager);
  },
  NewRequestScriptNamesQuery: function() {
    return breeze.EntityQuery.from("Request/ScriptNames").using(this.manager);
  },
  NewRequestHostsQuery: function () {
    return breeze.EntityQuery.from("Request/Hosts").using(this.manager);
  },
  
  //Exceptions
  NewExceptionsQuery: function () {
    return breeze.EntityQuery.from("Exception/Exceptions").using(this.manager);
  },
  NewExceptionsTypesQuery: function () {
    return breeze.EntityQuery.from("Exception/Types").using(this.manager);
  },
  NewExceptionsTargetSiteQuery: function () {
    return breeze.EntityQuery.from("Exception/TargetSite").using(this.manager);
  },
  NewExceptionsSourceQuery: function () {
    return breeze.EntityQuery.from("Exception/Source").using(this.manager);
  },
};