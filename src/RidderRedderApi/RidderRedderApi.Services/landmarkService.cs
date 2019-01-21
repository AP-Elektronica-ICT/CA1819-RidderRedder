using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RidderRedderApi.Models;
using RidderRedderApi.Repositories;

namespace RidderRedderApi.Services {
	public class LandmarkService {
		private LandmarkRepository landmarkRepo;
        private KnightRepository knightRepo;

		public LandmarkService(LandmarkRepository landmarkRepository, KnightRepository knightRepository) {
			this.landmarkRepo = landmarkRepository;
            this.knightRepo = knightRepository;
		}

		public List<Landmark> GetAll() {
			return this.landmarkRepo.GetLandmarks();
		}

		public Landmark Get(int landmarkId) {
			return this.landmarkRepo.Get(landmarkId);
		}

		public Landmark Update(Landmark l) {
                return this.landmarkRepo.Put(l);
		}

		public Landmark Post(Landmark l) {
			return this.landmarkRepo.Post(l);
		}

        public Landmark KillKnight(Landmark l)
        {
            if (l.Knights.Count > 0) {
                l.Knights.ToList();
                this.knightRepo.Delete(l.Knights.ToList()[0].KnightId);
                Landmark retLm = Get(l.LandmarkId);
                if (retLm.Knights.Count == 0){
                    retLm.Owner = null;
                    return Update(retLm);
                }
                else return Get(l.LandmarkId);
            }
            else return l;
            
        }

        public bool Delete(int landmarkId) {
			return this.landmarkRepo.Delete(landmarkId);
		}
	}
}
