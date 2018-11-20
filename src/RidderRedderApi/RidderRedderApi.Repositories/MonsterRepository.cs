using RidderRedderApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RidderRedderApi.Repositories
{
    public class MonsterRepository
    {
        private ApplicationContext context;

        public MonsterRepository(ApplicationContext ctx)
        {
            this.context = ctx;
        }

        public List<MonsterTitle> GetAllMonsterTitles() {
            try
            {
                IQueryable<MonsterTitle> query = context.MonsterTitles;
                return query.ToList();
            } catch (Exception e)
            {
                throw e;
            }
        }
        public List<MonsterModel> GetAllMonsterModels()
        {
            try
            {
                IQueryable<MonsterModel> query = context.MonsterModels;
                return query.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<MonsterName> GetAllMonsterNames()
        {
            try
            {
                IQueryable<MonsterName> query = context.MonsterNames;
                return query.ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
