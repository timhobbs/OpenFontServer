using System;
using System.Web.Http;

namespace OpenFontServer {

    public class Global : System.Web.HttpApplication {

        protected void Application_Start(object sender, EventArgs e) {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            //RouteConfig.RegisterRoutes(RouteTable.Routes);
            AutofacConfig.ConfigureContainer();
            AutomapperConfig.ConfigureMappings();
        }

        protected void Session_Start(object sender, EventArgs e) {
        }

        protected void Application_BeginRequest(object sender, EventArgs e) {
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e) {
        }

        protected void Application_Error(object sender, EventArgs e) {
        }

        protected void Session_End(object sender, EventArgs e) {
        }

        protected void Application_End(object sender, EventArgs e) {
        }
    }
}