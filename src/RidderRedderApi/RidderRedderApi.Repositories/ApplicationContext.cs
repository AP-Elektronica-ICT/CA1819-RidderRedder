using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;

namespace RidderRedderApi.Repositories {
    public class ApplicationContext : DbContext {

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) {

        }

        public DbSet<MonsterTitle> MonsterTitles { get; set; }
        public DbSet<MonsterModel> MonsterModels { get; set; }
        public DbSet<MonsterName> MonsterNames { get; set; }
        public DbSet<Monster> Monsters { get; set; }
        public DbSet<Element> Elements { get; set; }
        public DbSet<Landmark> Landmarks { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<InventoryItem> InventoryItems { get; set; }
        public DbSet<ItemImage> ItemImages { get; set; }
        public DbSet<ItemType> ItemTypes { get; set; }
        public DbSet<Knight> Knights { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("RidderRedderAPI");
            modelBuilder.Entity<MonsterTitle>().ToTable("MonsterTitle");
            modelBuilder.Entity<MonsterName>().ToTable("MonsterName");
            modelBuilder.Entity<MonsterModel>().ToTable("MonsterModel");
            modelBuilder.Entity<Landmark>().ToTable("Landmark");
            modelBuilder.Entity<Player>().ToTable("Player");
            modelBuilder.Entity<Element>().ToTable("Element");
            modelBuilder.Entity<InventoryItem>().ToTable("InventoryItem");
            modelBuilder.Entity<ItemImage>().ToTable("ItemImage");
            modelBuilder.Entity<ItemType>().ToTable("ItemType");
            modelBuilder.Entity<Knight>().ToTable("Knight");


            //modelBuilder.Entity<Monster>().HasOne<MonsterTitle>(s => s.MonsterTitle);

        }

    }
}
