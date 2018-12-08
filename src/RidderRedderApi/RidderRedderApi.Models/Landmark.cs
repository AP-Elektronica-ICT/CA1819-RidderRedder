using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace RidderRedderApi.Models {
    /// <summary>
    /// Landmark
    /// </summary>
    [Table("Landmark")]
    public class Landmark {
        /// <summary>
        /// Gets or sets the landmark identifier.
        /// </summary>
        /// <value>The landmarkidentifier.</value>
        [Key]
        public int LandmarkId { get; set; }
        /// <summary>
        /// Gets or sets the position x.
        /// </summary>
        /// <value>The position x.</value>
        public int PosX { get; set; }
        /// <summary>
        /// Gets or sets the position y.
        /// </summary>
        /// <value>The position y.</value>
        public int PosY { get; set; }

		/// <summary>
		/// Gets or sets the owner of the landmark.
		/// </summary>
		/// <value>owner Id.</value>
		[ForeignKey("Player")]
		public int Owner { get; set; }

		[ForeignKey("LandmarkId")]
		public ICollection<Knight> Knights { get; set; }
	}
}
