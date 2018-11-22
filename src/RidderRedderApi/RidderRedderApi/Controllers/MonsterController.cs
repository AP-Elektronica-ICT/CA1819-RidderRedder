using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RidderRedderApi.Web.Api.Controllers {
    /// <summary>
    /// Monster controller.
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MonsterController : BaseController {

        private MonsterService monsterService;
        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Web.Api.Controllers.MonsterController"/> class.
        /// </summary>
        /// <param name="monsterService">Monster service.</param>
        public MonsterController(MonsterService monsterService) {
            this.monsterService = monsterService;
        }


        /// <summary>
        /// Get a new randomly generated monster
        /// </summary>
        /// <returns>The get.</returns>
        [HttpGet]
        public IActionResult Get() {

            return Ok(monsterService.GetRandomMonsters(1)[0]);
        }

        /// <summary>
        /// Gets a list of {count} randomly generated monsters
        /// </summary>
        /// <returns>The list.</returns>
        /// <param name="count">Count.</param>
        [HttpGet("{count}")]
        public IActionResult GetList(int count) {
            return Ok(monsterService.GetRandomMonsters(count));
        }

    }
}