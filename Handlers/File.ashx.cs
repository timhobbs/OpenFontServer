using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace OpenFontServer.Handlers {
    /// <summary>
    /// Summary description for File
    /// </summary>
    public class File : IHttpHandler {

        public void ProcessRequest(HttpContext context) {
            var qs = context.Request.QueryString;
            if (qs == null || qs.Count == 0) {
                return;
            }

            var file = qs["f"];
            if (file == null) {
                return;
            }

            var ext = Path.GetExtension(file);

            switch (ext) {
                case ".otf":
                    context.Response.ContentType = "application/x-font-otf";
                    break;
                case ".svg":
                    context.Response.ContentType = "image/svg+xml";
                    break;
                case ".png":
                    context.Response.ContentType = "image/png";
                    break;
                case ".jpg":
                case ".jpeg":
                    context.Response.ContentType = "image/jpeg";
                    break;
                case ".pdf":
                    context.Response.ContentType = "application/pdf";
                    break;
                default:
                    context.Response.ContentType = "application/octet-stream";
                    break;
            }

            var dl = qs["dl"];
            if (dl != null) {
                var name = Path.GetFileName(file);
                context.Response.AppendHeader("content-disposition", String.Format("attachment; filename={0}", name));
            }

            context.Response.WriteFile(file);
        }

        public bool IsReusable {
            get {
                return false;
            }
        }
    }
}