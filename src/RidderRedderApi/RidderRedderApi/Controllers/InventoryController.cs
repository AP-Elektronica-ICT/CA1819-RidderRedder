using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RidderRedderApi.Models;
using RidderRedderApi.ViewModels;
using RidderRedderApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RidderRedderApi.Web.Api.Controllers {

    /// <summary>
    /// Inventory controller.
    /// </summary>
    [Route("api/v1/[controller]")]
    [ApiController]
    public class InventoryController : BaseController {

        private InventoryService inventoryService;

        /// <summary>
        /// Initializes a new instance of the <see cref="T:RidderRedderApi.Web.Api.Controllers.InventoryController"/> class.
        /// </summary>
        /// <param name="invService">Inv service.</param>
        public InventoryController(InventoryService invService) {
            this.inventoryService = invService;
        }

        /// <summary>
        /// Gets the inventory for player.
        /// </summary>
        /// <returns>The inventory for player.</returns>
        /// <param name="authid">Authid.</param>
        [HttpGet("{authid}")]
        public List<InventoryItem> GetInventoryForPlayer(string authid) {
            return this.inventoryService.GetInventoryForPlayer(authid);
        }

        /// <summary>
        /// Posts the inventory item.
        /// </summary>
        /// <returns>The inventory item.</returns>
        /// <param name="item">Item.</param>
        [HttpPost]
        public InventoryItem PostInventoryItem([FromBody]AddInventoryItemDto item) {
            return this.inventoryService.PostInventoryItem(item);
        }

        /// <summary>
        /// Updates the inventory item.
        /// </summary>
        /// <returns>The inventory item.</returns>
        /// <param name="item">Item.</param>
        /// <param name="itemid">Itemid.</param>
        [HttpPut("{itemid}")]
        public InventoryItem UpdateInventoryItem([FromBody]UpdateInventoryItemDto item, int itemid) {
            return this.inventoryService.UpdateInventoryItem(item, itemid);
        }

        /// <summary>
        /// Deletes the inventory item.
        /// </summary>
        /// <returns><c>true</c>, if inventory item was deleted, <c>false</c> otherwise.</returns>
        /// <param name="itemid">Itemid.</param>
        [HttpDelete("{itemid}")]
        public bool DeleteInventoryItem(int itemid) {
            return this.inventoryService.DeleteInventoryItem(itemid);
        }

        /// <summary>
        /// Gets all item types.
        /// </summary>
        /// <returns>The all item types.</returns>
        [HttpGet("types")]
        public List<ItemType> GetAllItemTypes() {
            return this.inventoryService.GetAllItemTypes();
        }

        /// <summary>
        /// Gets all item images.
        /// </summary>
        /// <returns>The all item images.</returns>
        [HttpGet("images")]
        public List<ItemImage> GetAllItemImages() {
            return this.inventoryService.GetAllItemImages();
        }
    }
}
