using AutoMapper;
using OpenFontServer.Data.Entities;
using OpenFontServer.Models;

namespace OpenFontServer {

    public class AutomapperConfig {

        public static void ConfigureMappings() {
            // Font info
            Mapper.CreateMap<FontInfo, FontInfoModel>();
            Mapper.CreateMap<FontInfoModel, FontInfo>();

            // Font enums
            Mapper.CreateMap<FontWeight, int>();
            Mapper.CreateMap<FontStyle, int>();
            Mapper.CreateMap<FontStretch, int>();
            Mapper.CreateMap<int, FontWeight>();
            Mapper.CreateMap<int, FontStyle>();
            Mapper.CreateMap<int, FontStretch>();
        }
    }
}