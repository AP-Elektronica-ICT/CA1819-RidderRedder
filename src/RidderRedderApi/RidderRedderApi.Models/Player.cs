﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace RidderRedderApi.Models {
    /// <summary>
    /// Player.
    /// </summary>
    [Table("Players")]
    public class Player {
        /// <summary>
        /// Gets or sets the auth identifier.
        /// </summary>
        /// <value>The auth identifier.</value>
        [Key]
        public string AuthId { get; set; }

        /// <summary>
        /// Gets or sets the name of the player.
        /// </summary>
        /// <value>The name of the player.</value>
        public string PlayerName { get; set; }
        /// <summary>
        /// Gets or sets the experience.
        /// </summary>
        /// <value>The experience.</value>
        public int Experience { get; set; }

		[ForeignKey("Owner")]
		public ICollection<Landmark> Landmarks { get; set; }
    }
}
