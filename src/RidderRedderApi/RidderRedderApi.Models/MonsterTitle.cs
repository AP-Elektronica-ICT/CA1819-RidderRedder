using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace RidderRedderApi {

    /// <summary>
    /// Monster title.
    /// </summary>
    public class MonsterTitle {
        /// <summary>
        /// Gets or sets the monster title identifier.
        /// </summary>
        /// <value>The monster title identifier.</value>
        [Key]
        public int MonsterTitleId { get; set; }
        /// <summary>
        /// Gets or sets the monster title text.
        /// </summary>
        /// <value>The monster title text.</value>
        public string MonsterTitleText { get; set; }
    }
}
