using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
namespace RidderRedderApi.Models {
    /// <summary>
    /// Monument.
    /// </summary>
    public class Monument {
        /// <summary>
        /// Gets or sets the monument identifier.
        /// </summary>
        /// <value>The monument identifier.</value>
        [Key]
        public int MonumentId { get; set; }
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

    }
}
