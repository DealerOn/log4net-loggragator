using System.Linq;
using System.Web.Http;
using Breeze.WebApi;
using DealerOn.Logging;

namespace LogViewer.Controllers
{
  [BreezeController]
  public class RequestController : EFBackedController
  {
    [HttpGet]
    public IQueryable<RequestInfo> Requests()
    {
      return DC.RequestInfoes;
    }

    [HttpGet]
    public IQueryable<string> ScriptNames()
    {
      return DC.RequestInfoes.Select(x => x.ScriptName).Distinct();
    }

    [HttpGet]
    public IQueryable<string> Hosts()
    {
      return DC.RequestInfoes.Select(x => x.Host).Distinct();
    }
  }
}