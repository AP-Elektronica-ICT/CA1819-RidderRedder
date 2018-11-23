using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Models;
using RidderRedderApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RidderRedderApi.Web.Api.Controllers {
    /// <summary>
    /// Player controller.
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlayerController : BaseController {
        private PlayerService playerService;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Web.Api.Controllers.PlayerController"/> class.
        /// </summary>
        /// <param name="playerService">Player service.</param>
        public PlayerController(PlayerService playerService) {
            this.playerService = playerService;
        }

        /// <summary>
        /// Gets all players
        /// </summary>
        /// <returns>The all.</returns>
        [HttpGet]
        public IActionResult GetAll() {
            return Ok(playerService.GetAll());
        }

        /// <summary>
        /// Get the specified player with given userid
        /// </summary>
        /// <returns>The get.</returns>
        /// <param name="authId">Auth identifier.</param>
        [HttpGet("{authId}")]
        public IActionResult Get(string authId) {
            return Ok(playerService.Get(authId));
        }

        /// <summary>
        /// Update the specified player with given authid
        /// </summary>
        /// <returns>The update.</returns>
        /// <param name="authid">Authid.</param>
        /// <param name="p">P.</param>
        [HttpPut("{authid}")]
        public IActionResult Update(string authid, [FromBody]Player p) {
            return Ok(playerService.Update(p));
        }

        /// <summary>
        /// Post the specified Player
        /// </summary>
        /// <returns>The post.</returns>
        /// <param name="p">P.</param>
        [HttpPost]
        public IActionResult Post([FromBody] Player p) {
            return Ok(playerService.Post(p));
        }

        /// <summary>
        /// Delete the specified player.
        /// </summary>
        /// <returns>The delete.</returns>
        /// <param name="authId">Auth identifier.</param>
        [HttpDelete("{authId}")]
        public IActionResult Delete(string authId) {
            return Ok(playerService.Delete(authId));
        }


    }
}