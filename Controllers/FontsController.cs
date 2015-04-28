using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using OpenFontServer.Models;
using OpenFontServer.Services;

namespace OpenFontServer.Controllers
{
    public class FontsController : ApiController
    {

        private readonly IFontInfoService _fontInfoService;

        public FontsController(IFontInfoService fontInfoService) {
            _fontInfoService = fontInfoService;
        }

        public IHttpActionResult GetFonts([FromUri]PagingModel paging) {
            if (paging == null) {
                paging = new PagingModel {
                    PageNumber = 0,
                    PageSize = 25
                };
            }

            var info = _fontInfoService.GetFontInfoList(paging.PageNumber, paging.PageSize);

            return Ok(new { list = info, total = info.TotalCount });
        }

        public IHttpActionResult GetFontInfo(int id) {
            try {
                var fi = _fontInfoService.GetFontInfo(id);
                if (fi == null) {
                    return NotFound();
                }

                // Check if we have a font image or not
                var img = Path.Combine(Path.GetDirectoryName(fi.FilePath), Path.GetFileNameWithoutExtension(fi.FilePath) + ".png");
                if (File.Exists(img)) {
                    fi.FontImagePath = img;
                }

                return Ok(fi);
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        public IHttpActionResult PostFonts([FromBody]string path) {
            try {
                var fonts = _fontInfoService.GetFontsFromFolder(path);
                var saved = _fontInfoService.SaveFontInfo(fonts);
                return Ok(new { count = saved.Count });
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
    }
}
