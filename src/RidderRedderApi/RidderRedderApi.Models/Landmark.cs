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
        /// Gets or sets the lattitude.
        /// </summary>
        /// <value>The lat</value>
        public float Lat { get; set; }
        /// <summary>
        /// Gets or sets longitude.
        /// </summary>
        /// <value>The lon</value>
        public float Lng { get; set; }

		public string Name { get; set; }

		/// <summary>
		/// Gets or sets the owner of the landmark.
		/// </summary>
		/// <value>owner Id.</value>
		[ForeignKey("Player")]
		public string Owner { get; set; }

		[ForeignKey("LandmarkId")]
		public ICollection<Knight> Knights { get; set; }
	}
}
