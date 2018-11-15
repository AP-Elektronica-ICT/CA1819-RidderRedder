using RidderRedderApi.Models;
using Microsoft.EntityFrameworkCore;

namespace RidderRedderApi {

    public class RidderRedderContext : DbContext {

        public RidderRedderContext(DbContextOptions<RidderRedderContext> options) : base(options) {

        }

        public DbSet<MonsterName> MonsterNames { get; set; }
        public DbSet<MonsterModel> MonsterModels { get; set; }
        public DbSet<MonsterTitle> MonsterTitles { get; set; }
        public DbSet<Monument> Monuments { get; set; }
        public DbSet<Player> Players { get; set; }
    }
}

