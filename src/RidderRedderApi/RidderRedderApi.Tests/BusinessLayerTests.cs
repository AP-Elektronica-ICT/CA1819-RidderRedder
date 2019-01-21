using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit;
using NUnit.Framework;
using RidderRedderApi.Models;
using RidderRedderApi.Repositories;
using RidderRedderApi.Services;
using RidderRedderApi.ViewModels;
using System;
using System.Collections.Generic;
using TestSupport.EfHelpers;
using Xunit;

namespace RidderRedderApi.Tests
{
    public class BusinessLayerTests
    {

        private ApplicationContext context;

        private InventoryRepository inventoryRepository;
        private InventoryService inventoryService;

        private PlayerRepository playerRepository;
        private PlayerService playerService;

        private MonsterRepository monsterRepository;
        private MonsterService monsterService;

        private KnightRepository knightRepository;
        private LandmarkRepository landmarkRepository;
        private LandmarkService landmarkService;


        public BusinessLayerTests()
        {

            var options = SqliteInMemory.CreateOptions<ApplicationContext>();

            context = new ApplicationContext(options);
            context.Database.EnsureCreated();

            // Seed Inventory content
            context.SeedItemTypes();
            context.SeedItemImages();


            // Seed Monster content
            context.SeedMonsterModels();
            context.SeedMonsterNames();
            context.SeedMonsterTitles();


            inventoryRepository = new InventoryRepository(context);
            inventoryService = new InventoryService(inventoryRepository);

            playerRepository = new PlayerRepository(context);
            playerService = new PlayerService(playerRepository);

            monsterRepository = new MonsterRepository(context);
            monsterService = new MonsterService(monsterRepository);

            knightRepository = new KnightRepository(context);
            landmarkRepository = new LandmarkRepository(context);
            landmarkService = new LandmarkService(landmarkRepository, knightRepository);

        }

        #region seedCreated
        [Fact]
        public void ItemImagesCreated() => context.ItemImages.Should().HaveCountGreaterOrEqualTo(3);

        [Fact]
        public void ItemTypesCreated() => context.ItemTypes.Should().HaveCountGreaterOrEqualTo(2);

        [Fact]
        public void MonsterModelsCreated() => context.MonsterModels.Should().HaveCountGreaterOrEqualTo(2);

        [Fact]
        public void MonsterTitlesCreated() => context.MonsterTitles.Should().HaveCountGreaterOrEqualTo(2);

        [Fact]
        public void MonsterNamesCreated() => context.MonsterNames.Should().HaveCountGreaterOrEqualTo(2);
        #endregion

        /*
         * Start of PlayerService testing
         */
        #region playerTesting
        /// <summary>
        /// Ensure users can be GET
        /// </summary>
        [Fact]
        public void GetAllUsersTest()
        {
            context.SeedPlayer(new Player { AuthId = "melvinAuth", Experience = 123, Landmarks = null, PlayerName = "Melvin" });
            context.SeedPlayer(new Player { AuthId = "joeriAuth", Experience = 456, Landmarks = null, PlayerName = "Joerie" });
            playerService.GetAll().Should().HaveCount(2);
        }

        /// <summary>
        /// Ensure user can be GET
        /// </summary>
        [Fact]
        public void GetUserTest()
        {
            Player p = new Player { AuthId = "adminAuth", Experience = 1337, Landmarks = null, PlayerName = "Admin" };
            context.SeedPlayer(p);

            playerService.Get("adminAuth").Should().Be(p);
        }

        /// <summary>
        /// Ensure user can be UPDATEd
        /// </summary>
        [Fact]
        public void UpdateUserTest()
        {
            context.SeedPlayer(new Player { AuthId = "adminAuth", Experience = 1337, Landmarks = null, PlayerName = "admeen" });

            Player p = playerService.Get("adminAuth");
            p.PlayerName = "Admin";
            playerService.Update(p, "adminAuth").PlayerName.Should().Be("Admin");
        }

        /// <summary>
        /// Ensure user can be POSTed
        /// </summary>
        [Fact]
        public void CreateUserTest()
        {
            Player p = new Player { AuthId = "adminAuth", Experience = 1337, Landmarks = null, PlayerName = "Admin" };
            playerService.Post(p).Should().Be(p);
        }

        /// <summary>
        /// Ensure user can be DELETEd
        /// </summary>
        [Fact]
        public void DeleteUserTest()
        {
            context.SeedPlayer(new Player { AuthId = "adminAuth", Experience = 1337, Landmarks = null, PlayerName = "admeen" });
            playerService.Delete("adminAuth").Should().Be(true);
        }

        #endregion

        /*
         * Start of MonsterService testing
         */
        #region monsterTesting
        /// <summary>
        /// Ensure monster titles can be GET
        /// </summary>
        [Fact]
        public void GetAllMonsterTitlesTest()
        {
            monsterService.GetAllMonsterTitles().Should().HaveCount(2);
        }

        /// <summary>
        /// Ensure monster models can be GET
        /// </summary>
        [Fact]
        public void GetAllMonsterModelsTest()
        {
            monsterService.GetAllMonsterModels().Should().HaveCount(2);
        }

        /// <summary>
        /// Ensure monster names can be GET
        /// </summary>
        [Fact]
        public void GetallMonsterNamesTest()
        {
            monsterService.GetAllMonsterNames().Should().HaveCount(2);
        }

        /// <summary>
        /// Ensure random monster generated
        /// </summary>
        [Fact]
        public void GetRandomMonsterTest()
        {
            List<Monster> monsters = monsterService.GetRandomMonsters(1);
            monsters.Should().HaveCount(1);
            monsters[0].MonsterId.Should().NotBe(null);
            monsters[0].MonsterName.Should().NotBe(null);
            monsters[0].MonsterTitle.Should().NotBe(null);
            monsters[0].MonsterModel.Should().NotBe(null);
        }

        /// <summary>
        /// Ensure random monsters are generated
        /// </summary>
        [Fact]
        public void GetRandomMonstersTest()
        {
            List<Monster> monsters = monsterService.GetRandomMonsters(3);
            monsters.Should().HaveCount(3);
            
            foreach (Monster monster in monsters)
            {
                monster.MonsterId.Should().NotBe(null);
                monster.MonsterName.Should().NotBe(null);
                monster.MonsterTitle.Should().NotBe(null);
                monster.MonsterModel.Should().NotBe(null);
            }
        }

        #endregion

        /*
         * Start of InventoryService testing
         */
        #region inventoryTesting

        /// <summary>
        /// Ensure player's inventory is empty and GET works
        /// </summary>
        [Fact]
        public void EmptyGetInventoryForPlayerTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });

            inventoryService.GetInventoryForPlayer("admin").Should().HaveCount(0);
        }

        /// <summary>
        /// Ensure player's inventory is not empty and GET works
        /// </summary>
        [Fact]
        public void FilledGetInventoryForPlayerTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });
            
            for(int i = 0; i < 3; i++)
                inventoryService.PostInventoryItem(new AddInventoryItemDto{ AuthId = "admin", InventoryItemId = i, ItemImageId = i, ItemTypeId = 1, Amount = i});
            
            inventoryService.GetInventoryForPlayer("admin").Should().HaveCount(3);
        }

        /// <summary>
        /// Ensure that an InventoryItem can be POSTed
        /// </summary>
        [Fact]
        public void PostInventoryItemTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });


            InventoryItem item = inventoryService.PostInventoryItem(new AddInventoryItemDto
            {
                AuthId = "admin",
                InventoryItemId = 1,
                ItemImageId = 1,
                ItemTypeId = 1,
                Amount = 1
            });

            item.Should().NotBeNull();
            item.InventoryItemId.Should().NotBe(null);
            
        }

        /// <summary>
        /// Ensure that an InventoryItem can be UPATEd 
        /// </summary>
        [Fact]
        public void UpdateInventoryItemTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });

            InventoryItem item = inventoryService.PostInventoryItem(new AddInventoryItemDto
            {
                AuthId = "admin",
                InventoryItemId = 1,
                ItemImageId = 1,
                ItemTypeId = 1,
                Amount = 1
            });

            UpdateInventoryItemDto updateItem = new UpdateInventoryItemDto { ItemTypeId = 2, ItemImageId = 2, Amount = 2 };
            InventoryItem updatedItem = inventoryService.UpdateInventoryItem(updateItem, 1);

            updatedItem.ItemImage.ItemImageId.Should().Be(2);
            updatedItem.ItemType.ItemTypeId.Should().Be(2);
            updatedItem.Amount.Should().Be(2);
        }

        [Fact]
        public void DeleteInventoryItemTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });

            InventoryItem item = inventoryService.PostInventoryItem(new AddInventoryItemDto
            {
                AuthId = "admin",
                InventoryItemId = 1,
                ItemImageId = 1,
                ItemTypeId = 1,
                Amount = 1
            });

            inventoryService.DeleteInventoryItem(item.InventoryItemId).Should().Be(true);
        }
        #endregion

        /* 
         * Start of LandmarkService testing
         */
        #region landmarkTesting

        /*
         * There are no unit tests for LandmarkService
         * because there is no business logic, thus
         * there is no need for testing.
         */

        [Fact]
        public void PostLandmarkTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });
            landmarkService.Post(new Landmark
            {
                LandmarkId = 1,
                Knights = null,
                Lat = 13.3337f,
                Lng = 66.6666f,
                Name = "Hel",
                Owner = "admin"
            }).Should().NotBeNull();
        }

        [Fact]
        public void GetLandMarkByIdTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });
            landmarkService.Post(new Landmark { LandmarkId = 1, Knights = null, Lat = 13.3337f, Lng = 66.6666f, Name = "Hel", Owner = "admin" });

            landmarkService.Get(1).Should().NotBeNull();
        }

        [Fact]
        public void KillKnightTest()
        {
            context.SeedPlayer(new Player { AuthId = "admin", Experience = 123, Landmarks = null, PlayerName = "Admin" });
            List<Knight> knights = new List<Knight>();
            knights.Add(new Knight { AuthId = "admin", Colour = 1, KnightId = 1, Landmark = null, LandmarkId = 0, Level = 25 });
            knights.Add(new Knight { AuthId = "admin", Colour = 2, KnightId = 2, Landmark = null, LandmarkId = 0, Level = 15 });
            context.Landmarks.Add(new Landmark { LandmarkId = 1, Knights = knights, Lat = 13.3337f, Lng = 66.6666f, Name = "Hel", Owner = "admin" });

            landmarkService.Get(1).Knights.Should().HaveCount(2);
        }

        #endregion

    }
}
