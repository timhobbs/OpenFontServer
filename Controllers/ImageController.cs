using System;
using System.Web.Http;
using OpenFontServer.Services;

namespace OpenFontServer.Controllers {

    public class ImageController : ApiController {
        private readonly IFontInfoService _fontInfoService;
        private readonly IImageService _imageService;

        public ImageController(IFontInfoService fontInfoService,
                                IImageService imageService) {
            _fontInfoService = fontInfoService;
            _imageService = imageService;
        }

        public IHttpActionResult Post([FromBody]int id) {
            try {
                var fi = _fontInfoService.GetFontInfo(id);
                if (fi == null) {
                    return NotFound();
                }

                _imageService.CreateImage(fi.FilePath);
                return Ok();
            } catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }
    }
}