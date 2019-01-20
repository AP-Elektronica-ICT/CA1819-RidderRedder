using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RidderRedderApi.Web.Api.Controllers
{
    /// <summary>
    /// Base controller for every other controllers.
    /// We should add user authentication here.
    /// </summary>
    [ApiController]
    public class BaseController : ControllerBase
    {

    }
}