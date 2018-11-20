using System;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Models;

namespace RidderRedderApi.Web.API {

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
        public IActionResult GetNewMonster() {


            return Ok("Monster");
        }

        [HttpPost]
        public IActionResult KillMonster() {
            return Ok("Monster killed");
        }

    }
}
