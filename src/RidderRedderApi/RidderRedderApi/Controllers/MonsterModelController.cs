using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace RidderRedderApi.Web.Api.Controllers {


    /// <summary>
    /// Monster model controller.
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MonsterModelController : BaseController {

        //private MonsterModelService monsterModelService;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Web.Api.Controllers.MonsterModelController"/> class.
        /// </summary>
        public MonsterModelController() {
        }

        /// <summary>
        /// Gets the monster model image stored on the server saved in PNG format
        /// </summary>
        /// <returns>The monster model image.</returns>
        /// <param name="monsterModelPath">Monster model path.</param>
        [HttpGet("{monsterModelPath}")]
        public IActionResult GetMonsterModelImage(string monsterModelPath) {

            var image = System.IO.File.OpenRead("C:\\test\random_image.jpeg");
            return File(image, "image/jpeg");
        }
    }


}
