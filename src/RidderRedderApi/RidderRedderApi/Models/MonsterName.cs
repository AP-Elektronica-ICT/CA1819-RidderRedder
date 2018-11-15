using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
namespace RidderRedderApi.Models {
    /// <summary>
    /// Monster name.
    /// </summary>
    public class MonsterName {

        /// <summary>
        /// Gets or sets the monster name identifier.
        /// </summary>
        /// <value>The monster name identifier.</value>
        [Key]
        public int MonsterNameId { get; set; }

        /// <summary>
        /// Gets or sets the monster name text.
        /// </summary>
        /// <value>The monster name text.</value>
        public string MonsterNameText { get; set; }
    }
}
