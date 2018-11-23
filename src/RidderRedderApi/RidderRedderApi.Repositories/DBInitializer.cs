using System;
using System.Collections.Generic;
using System.Text;

namespace RidderRedderApi.Repositories
{
    public class DBInitializer
    {

        public static void Initialize(ApplicationContext context)
        {
            context.Database.EnsureCreated();

          //  context.SaveChanges();
        }
    }
}
