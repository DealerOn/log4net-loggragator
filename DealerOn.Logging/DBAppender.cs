using System;
using System.Collections.Generic;
using System.Data.EntityClient;
using System.Linq;
using System.Threading;
using System.Web;
using log4net.Appender;
using log4net.Core;

namespace DealerOn.Logging
{
  public partial class LoggingEF
  {
    public LoggingEF(string connectionString)
      : base(connectionString)
    {

    }
  }

  public static class Extensions
  {
    public static string Right(this string sValue, int iMaxLength)
    {
      //Check if the value is valid
      if (string.IsNullOrEmpty(sValue))
      {
        //Set valid empty string as string could be null
        sValue = string.Empty;
      }
      else if (sValue.Length > iMaxLength)
      {
        //Make the string no longer than the max length
        sValue = sValue.Substring(sValue.Length - iMaxLength, iMaxLength);
      }

      //Return the string
      return sValue;
    }
  }

  public class DBAppender : AppenderSkeleton
  {
    private string connectionString;
    public string ConnectionString { get { return connectionString; } set { connectionString = value; } }
    private LoggingEF NewDC()
    {
      var ecb = new EntityConnectionStringBuilder
      {
        Metadata = "res://*/Logging.csdl|res://*/Logging.ssdl|res://*/Logging.msl",
        Provider = "MySql.Data.MySqlClient",
        ProviderConnectionString = connectionString
      };

      return new LoggingEF(ecb.ConnectionString);
    }

    

    protected override void Append(LoggingEvent loggingEvent)
    {
      try
      {
        var context = HttpContext.Current;
        new Thread(() =>
          {
            var threadcontext = context;
            try
            {
              using (var dc = NewDC())
              {
                var entry = new LogEntry
                  {
                    LoggerName = loggingEvent.LoggerName.Right(128),
                    TimeStamp = loggingEvent.TimeStamp,
                    Message = loggingEvent.RenderedMessage.Right(512),
                    Thread = loggingEvent.ThreadName,
                    Host = Environment.MachineName,
                  };

                foreach (var logException in ExeptionList(loggingEvent.ExceptionObject))
                {
                  entry.Exceptions.Add(logException);
                }

                entry.RequestId = CreateRequestInfo(threadcontext);
                var name = loggingEvent.Level.DisplayName.ToLower();
                var first = name[0];
                name = name.Remove(0, 1);
                name = first.ToString().ToUpper() + name;
                entry.Level = name;
                dc.LogEntries.Add(entry);
                dc.SaveChanges();
              }
            }
            catch (Exception e)
            {
              System.Console.WriteLine(e.ToString());
            }
          }).Start();
      }
      catch (Exception e)
      {
        System.Console.WriteLine(e.ToString());
      }
    }

    private static IEnumerable<LogException> ExeptionList(System.Exception exception)
    {
      var list = new List<LogException>();
      if (null != exception)
      {
        var level = 1;
        for (; null != exception; exception = exception.InnerException)
        {
          list.Add(
            new LogException
            {
              Level = level,
              Message = exception.Message,
              Source = exception.Source,
              TargetSite = exception.TargetSite.ToString(),
              StackTrace = exception.StackTrace,
              Type = exception.GetType().ToString(),
              TimeStamp = DateTime.Now,
            });
          level++;
        }
      }
      return list;
    }

    private static Dictionary<HttpRequest, Tuple<int, DateTime>> Requests;

    private int? CreateRequestInfo(HttpContext context)
    {
      if (null != context)
      {
        var sessionId = context.Request;

        if (Requests == null)
        {
          Requests = new Dictionary<HttpRequest, Tuple<int, DateTime>>();
        }

        lock (Requests)
        {
          if (!Requests.ContainsKey(sessionId))
          {
            using (var dc = NewDC())
            {
              var request = context.Request;
              var info = new RequestInfo
                {
                  Referer = "" + request.ServerVariables["HTTP_REFERER"],
                  Url = request.Url.ToString(),
                  QueryString = request.ServerVariables["QUERY_STRING"],
                  Host = request.ServerVariables["HTTP_HOST"],
                  UserAgent = request.ServerVariables["HTTP_USER_AGENT"],
                  RemoteAddress = RemoteAddr(context),
                  ScriptName = request.ServerVariables["SCRIPT_NAME"],
                  Method = request.HttpMethod,
                  TimeStamp = context.Timestamp,
                  //HTTPStatus = HttpContext.Current.Response.Status,
                  //Time = 0,
                };
                dc.RequestInfoes.Add(info);
                dc.SaveChanges();
              Requests[sessionId] = new Tuple<int, DateTime>(info.Id, context.Timestamp);
            }
          }
          //Remove all requests older than a minute
          var expiredTime = DateTime.Now.AddMinutes(-2);

          var expired = Requests.Where(x => x.Value.Item2 < expiredTime).ToList();
          foreach (var exp in expired)
          {
            Requests.Remove(exp.Key);
          }
        }
        return Requests[sessionId].Item1;
      }
      return null;
    }

    private static string RemoteAddr(HttpContext context)
    {
      return context.Request.ServerVariables.AllKeys.Contains("HTTP_X_FORWARDED_FOR") ?
        context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] :
        context.Request.ServerVariables["REMOTE_ADDR"];
    }
  }
}
