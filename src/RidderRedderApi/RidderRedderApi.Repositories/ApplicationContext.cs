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

        public void SeedItemImages()
        {
            ItemImages.Add(new ItemImage { ItemImageId = 1, Path = "knight_blue.png" });
            ItemImages.Add(new ItemImage { ItemImageId = 2, Path = "knight_red.png" });
            ItemImages.Add(new ItemImage { ItemImageId = 3, Path = "knight_green.png" });
            SaveChanges();
        }
        public void SeedItemTypes()
        {
            ItemTypes.Add(new ItemType { ItemTypeId = 1, ItemTypeName = "Knight" });
            ItemTypes.Add(new ItemType { ItemTypeId = 2, ItemTypeName = "Potion" });
            SaveChanges();
        }

        public void SeedMonsterTitles()
        {
            MonsterTitles.Add(new MonsterTitle { MonsterTitleId = 1, MonsterTitleText = "Baron" });
            MonsterTitles.Add(new MonsterTitle { MonsterTitleId = 2, MonsterTitleText = "Captain" });
            SaveChanges();
        }

        public void SeedMonsterNames()
        {
            MonsterNames.Add(new MonsterName { MonsterNameId = 1, MonsterNameText = "Sven" });
            MonsterNames.Add(new MonsterName { MonsterNameId = 2, MonsterNameText = "Tom" });
            SaveChanges();
        }

        public void SeedMonsterModels()
        {
            MonsterModels.Add(new MonsterModel { MonsterModelId = 1, MonsterModelPath = "path/monster1.png" });
            MonsterModels.Add(new MonsterModel { MonsterModelId = 2, MonsterModelPath = "path/monster2.png" });
            SaveChanges();
        }

        public void SeedPlayer(Player p)
        {
            Players.Add(p);
            SaveChanges();
        }


        public void SeedInventoryItem(InventoryItem item)
        {
            InventoryItems.Add(item);
        }
    }
}
