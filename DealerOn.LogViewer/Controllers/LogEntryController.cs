using System;
using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using DealerOn.Logging;
using System.Collections.Generic;

namespace LogViewer.Controllers
{
  [BreezeController]
  public class LogEntryController : EFBackedController
  {
    [HttpGet]
    public IQueryable<LogEntry> Entries()
    {
      return DC.LogEntries;
    }

    [HttpGet]
    public IQueryable<string> Levels()
    {
      return DC.LogEntries.Select(x => x.Level).Distinct();
    }

    [HttpGet]
    public IQueryable<string> LoggerNames()
    {
      return DC.LogEntries.Select(x => x.LoggerName).Distinct();
    }

    [HttpGet]
    public IQueryable<string> HostNames()
    {
      return DC.LogEntries.Select(x => x.Host).Distinct();
    }

    [HttpGet]
    public IQueryable<KeyValuePair<string, Dictionary<DateTime, int>>> AggregateEntriesByLevel(string startstr, string finishstr)
    {
      var start = DateTime.Parse(startstr);
      var finish = DateTime.Parse(finishstr);

      var res = new List<KeyValuePair<string, Dictionary<DateTime, int>>>();
      var entries = DC.LogEntries.Where(x => x.TimeStamp > start && x.TimeStamp < finish);
      var list = entries.Select(x => x.Level).Distinct().ToList();
      foreach (var level in list)
      {
        var dict = new Dictionary<DateTime, int>();
        for (var startDate = start.Date; startDate < finish; startDate = startDate.AddHours(1))
        {
          var endDate = startDate.AddHours(1);
          dict.Add(startDate.ToUniversalTime(), DC.LogEntries.Count(x => x.Level == level && x.TimeStamp > startDate && x.TimeStamp < endDate));
        }

        res.Add(new KeyValuePair<string, Dictionary<DateTime, int>>(level, dict));
      }
      return res.AsQueryable();
    }
  }
}