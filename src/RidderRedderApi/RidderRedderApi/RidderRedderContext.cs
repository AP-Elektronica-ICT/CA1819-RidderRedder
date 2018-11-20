using RidderRedderApi.Models;
using Microsoft.EntityFrameworkCore;

namespace RidderRedderApi {

    public class RidderRedderContext : DbContext {

        public RidderRedderContext(DbContextOptions<RidderRedderContext> options) : base(options) {

        }


    }
}

