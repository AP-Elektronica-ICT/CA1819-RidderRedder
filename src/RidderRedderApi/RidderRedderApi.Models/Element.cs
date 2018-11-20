using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace RidderRedderApi.Models {
    /// <summary>
    /// Element.
    /// </summary>
    public class Element {

        /// <summary>
        /// Gets or sets the element identifier.
        /// </summary>
        /// <value>The element identifier.</value>
        [Key]
        public int ElementId { get; set; }
        /// <summary>
        /// Gets or sets the name of the element.
        /// </summary>
        /// <value>The name of the element.</value>
        public string ElementName { get; set; }
        /// <summary>
        /// Gets or sets the element counter identifier.
        /// </summary>
        /// <value>The element counter identifier.</value>
        public int ElementCounterId { get; set; }
    }
}
