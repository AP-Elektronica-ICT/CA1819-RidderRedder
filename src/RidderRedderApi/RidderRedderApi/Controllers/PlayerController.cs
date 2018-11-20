using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Models;
using RidderRedderApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RidderRedderApi.Web.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlayerController : BaseController
    {
        private PlayerService playerService;

        public PlayerController(PlayerService playerService)
        {
            this.playerService = playerService;
        }

        [HttpGet("{name:string}")]
        public IActionResult GetList(string name = "")
        {
            return Ok(playerService.GetList(name));
        }

        [HttpGet("{authid:string}")]
        public IActionResult Get(string authId)
        {
            return Ok(playerService.Get(authId));
        }

        [HttpPut("{authid:string}")]
        public IActionResult Update(string authid, [FromBody]Player p)
        {
            return Ok(playerService.Update(p));
        }

        [HttpPost]
        public IActionResult Post([FromBody] Player p)
        {
            return Ok(playerService.Post(p));
        }

        [HttpDelete("{authid:string}")]
        public IActionResult Delete([FromBody] Player p)
        {
            return Ok(playerService.Delete(p));
        }


    }
}