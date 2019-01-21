using RidderRedderApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RidderRedderApi.Repositories
{
    public class KnightRepository
    {
        private ApplicationContext context;

        public KnightRepository(ApplicationContext ctx)
        {
            this.context = ctx;
        }

        public bool Delete(int knightId)
        {
            try
            {
                this.context.Knights.Remove(this.context.Knights.Find(knightId));
                this.context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
