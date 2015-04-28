using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using OpenFontServer.Core;
using OpenFontServer.Data;
using OpenFontServer.Services;

namespace OpenFontServer {

    public class AutofacConfig {

        public static void ConfigureContainer() {
            var builder = new ContainerBuilder();

            var config = GlobalConfiguration.Configuration;

            builder.RegisterType<DataStorage>()
                   .As<IStorage>();
            builder.RegisterType<FontInfoService>()
                   .As<IFontInfoService>();
            builder.RegisterType<ImageService>()
                   .As<IImageService>();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}