using System;
namespace RidderRedderApi.Models {
    public class DBInitializer {
        public static void Initialize(RidderRedderContext context) {
            context.Database.EnsureCreated();
        }
    }
}
