using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace RidderRedderApi.Controllers {

    /// <summary>
    /// Ping controller.
    /// </summary>
    [Route("api/v1/[controller]")]
    public class PingController : BaseController {

        /// <summary>
        /// Pings the server to see if its up
        /// </summary>
        /// <returns>The get.</returns>
        [HttpGet]
        public IActionResult Get() {
            return Ok("Ping");
        }
    }
}