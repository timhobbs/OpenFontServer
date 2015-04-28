using System;
using System.Web.Http;
using OpenFontServer.Models;
using OpenFontServer.Services;

namespace OpenFontServer.Controllers {

    public class SearchController : ApiController {
        private readonly IFontInfoService _fontInfoService;

        public SearchController(IFontInfoService fontInfoService) {
            _fontInfoService = fontInfoService;
        }

        public IHttpActionResult Get([FromUri]SearchModel search) {
            var results = _fontInfoService.SearchFonts(search.SearchTerm, search.PageNumber, search.PageSize);
            return Ok(new { total = results.TotalCount, list = results });
        }
    }
}