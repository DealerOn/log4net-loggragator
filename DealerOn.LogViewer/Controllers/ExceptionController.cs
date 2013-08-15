using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using DealerOn.Logging;

namespace LogViewer.Controllers
{
  [BreezeController]
  public class ExceptionController : EFBackedController
  {
    [HttpGet]
    public IQueryable<LogException> Exceptions()
    {
      return DC.LogExceptions;
    }

    [HttpGet]
    public IQueryable<string> Types()
    {
      return DC.LogExceptions.Select(x => x.Type).Distinct();
    }

    [HttpGet]
    public IQueryable<string> TargetSite()
    {
      return DC.LogExceptions.Select(x => x.TargetSite).Distinct();
    }

    [HttpGet]
    public IQueryable<string> Source()
    {
      return DC.LogExceptions.Select(x => x.Source).Distinct();
    }
  }
}