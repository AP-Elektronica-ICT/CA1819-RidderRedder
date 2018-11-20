using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RidderRedderApi.Repositories
{
    public class PlayerRepository
    {
        private ApplicationContext context;

        public PlayerRepository(ApplicationContext ctx)
        {
            context = ctx;
        }

        public List<Player> GetAll(string name)
        {
            try
            {
                IQueryable<Player> query = context.Players;

                if (!string.IsNullOrEmpty(name))
                {
                    query = query.Where(d => d.PlayerName.Contains(name));
                }

                return query.ToList<Player>();
            } catch (Exception e)
            {
                throw e;
            }
        }

        public Player Get(string authId)
        {
            try
            {
                return context.Players.SingleOrDefault(d => d.AuthId == authId);
            } catch (Exception e)
            {
                throw e;
            }

        }

        public Player Put(Player p)
        {
            try
            {
                this.context.Players.Update(p);
                this.context.SaveChanges();
                return p;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Player Post(Player p)
        {
            try
            {
                this.context.Add(p);
                this.context.SaveChanges();
                return p;
            } catch (Exception e)
            {
                throw e;
            }
        }

        public bool Delete(Player p)
        {
            try
            {
                this.context.Remove(p);
                this.context.SaveChanges();
                return true;
            } catch (Exception e)
            {
                throw e;
            }
        }
    }
}
