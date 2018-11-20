using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RidderRedderApi.Web.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MonsterController : BaseController
    {

        private MonsterService monsterService;

        public MonsterController(MonsterService monsterService)
        {
            this.monsterService = monsterService;
        }

        [HttpGet]
        public IActionResult Get()
        {

            return Ok(monsterService.GetRandomMonsters(1)[0]);
        }

        [HttpGet("{count}")]
        public IActionResult GetList(int count)
        {
            return Ok(monsterService.GetRandomMonsters(count));
        }

    }
}