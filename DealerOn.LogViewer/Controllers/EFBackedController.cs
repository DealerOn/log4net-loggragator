using System.Configuration;
using System.Data.EntityClient;
using System.Web.Http;
using DealerOn.Logging;

namespace LogViewer.Controllers
{
  public class EFBackedController : ApiController
  {
    private static EntityConnectionStringBuilder Eab
    {
      get
      {
        var ecb = new EntityConnectionStringBuilder
        {
          Metadata = "res://*/Logging.csdl|res://*/Logging.ssdl|res://*/Logging.msl",
          Provider = "MySql.Data.MySqlClient",
          ProviderConnectionString = ConfigurationManager.ConnectionStrings["LogConnection"].ConnectionString
        };
        return ecb;
      }
    }
    public static string ConnectionString
    {
      get { return Eab.ConnectionString; }
    }

    protected readonly LoggingEF DC;
    public EFBackedController()
    {
      DC = new LoggingEF(ConnectionString);
      DC.Configuration.ProxyCreationEnabled = false;
      DC.Configuration.AutoDetectChangesEnabled = false;
      DC.Configuration.LazyLoadingEnabled = false;
    }

    protected override void Dispose(bool disposing)
    {
      DC.Dispose();
      base.Dispose(disposing);
    }
  }
}