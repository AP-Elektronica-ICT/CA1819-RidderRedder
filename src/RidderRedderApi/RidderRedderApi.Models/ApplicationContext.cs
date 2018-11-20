using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;

namespace RidderRedderApi.Models {

    public class ApplicationContext : DbContext {

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {

        }

        public DbSet<MonsterName> MonsterNames { get; set; }
        public DbSet<MonsterModel> MonsterModels { get; set; }
        public DbSet<MonsterTitle> MonsterTitles { get; set; }
        public DbSet<Monument> Monuments { get; set; }
        public DbSet<Player> Players { get; set; }
    }
}
