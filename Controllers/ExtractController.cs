using System;
using System.Linq;
using System.Web.Http;
using OpenFontServer.Models;
using OpenFontServer.Services;

namespace OpenFontServer.Controllers {

    public class ExtractController : ApiController {
        private readonly IFontInfoService _fontInfoService;

        public ExtractController(IFontInfoService fontInfoService) {
            _fontInfoService = fontInfoService;
        }

        public IHttpActionResult Post(ExtractFontsModel extract) {
            try {

                if (extract == null) {
                    throw new ArgumentNullException("extract");
                }

                var files = _fontInfoService.ExtractFilesFromArchives(extract.SourcePath, extract.DestinationPath);

                if (extract.MoveExtractedArchives) {
                    var list = files.Select(x => x.Key).ToList();
                    _fontInfoService.MoveExtractedArchives(list, extract.ProcessedPath);
                }

                return Ok(new { count = files.Count });
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
    }
}