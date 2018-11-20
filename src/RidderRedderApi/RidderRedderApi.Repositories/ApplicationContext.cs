using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;

namespace RidderRedderApi.Repositories
{
    public class ApplicationContext : DbContext
    {

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
        {

        }

        public DbSet<MonsterTitle> MonsterTitles { get; set; }
        public DbSet<MonsterModel> MonsterModels { get; set; }
        public DbSet<MonsterName> MonsterNames { get; set; }
        public DbSet<Monster> Monsters { get; set; }
        public DbSet<Element> Elements { get; set; }
        public DbSet<Monument> Monuments { get; set; }
        public DbSet<Player> Players { get; set; }

    }
}
