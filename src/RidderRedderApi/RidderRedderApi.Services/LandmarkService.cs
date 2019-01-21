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

        public Landmark KillKnight(Landmark landmark)
        {
            if (landmark.Knights.Count > 0) {
                landmark.Knights.ToList();
                this.knightRepo.Delete(landmark.Knights.ToList()[0].KnightId);
                Landmark retLandmark = Get(landmark.LandmarkId);
                if (retLandmark.Knights.Count == 0){
                    retLandmark.Owner = null;
                    return Update(retLandmark);
                }
                else return Get(landmark.LandmarkId);
            }
            else return landmark;
            
        }

        public bool Delete(int landmarkId) {
			return this.landmarkRepo.Delete(landmarkId);
		}
	}
}
