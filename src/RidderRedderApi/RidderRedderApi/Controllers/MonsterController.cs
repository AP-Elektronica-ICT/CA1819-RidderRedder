using System;
using Microsoft.AspNetCore.Mvc;

namespace RidderRedderApi.Controllers {

    /// <summary>
    /// Monster controller.
    /// </summary>
    [Route("api/v1/[controller]")]
    public class MonsterController : BaseController {

        //private readonly

        /// <summary>
        /// Gets the monsters.
        /// </summary>
        /// <returns>The monsters.</returns>
        [HttpGet]
        public IActionResult GetMonsters() {
            return Ok("Monster");
        }

    }
}
