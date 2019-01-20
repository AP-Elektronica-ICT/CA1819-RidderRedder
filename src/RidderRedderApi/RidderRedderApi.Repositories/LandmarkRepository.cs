using Microsoft.EntityFrameworkCore;
using RidderRedderApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RidderRedderApi.Repositories {
	public class LandmarkRepository {
		private ApplicationContext context;

		public LandmarkRepository(ApplicationContext ctx) {
			context = ctx;
		}

		public List<Landmark> GetLandmarks() {
			try {
                return this.context.Landmarks
                    .Include(lm => lm.Knights)
                    .ToList();
			}
			catch (Exception e) {
				throw e;
			}
		}

		public Landmark Get(int landmarkId) {
			try {
				return this.context.Landmarks
                    .Where(lm => lm.LandmarkId == landmarkId)
                    .Include(lm => lm.Knights)
                    .First();
			}
			catch (Exception e) {
				throw e;
			}
		}

		public Landmark UpdateLandmark(Landmark updatedLandmark, int landmarkId) {
			try {
				Landmark landmark = context.Landmarks.Find(landmarkId);

				if (landmark == null)
					return null;
				
				this.context.Landmarks.Update(updatedLandmark);
				this.context.SaveChanges();
				return updatedLandmark;
			}
			catch (Exception e) {
				throw e;
			}

		}
		public Landmark Put(Landmark l) {
			try {
				this.context.Landmarks.Update(l);
				this.context.SaveChanges();

                return this.context.Landmarks
                    .Where(lm => lm.LandmarkId == l.LandmarkId)
                    .Include(lm => lm.Knights)
                    .First();
			}
			catch (Exception e) {
				throw e;
			}
		}

		public Landmark Post(Landmark l) {
			try {
				this.context.Add(l);
				this.context.SaveChanges();
				return l;
			}
			catch (Exception e) {
				throw e;
			}
		}

		public bool Delete(int landmarkId) {
			try {
				Landmark landmark = this.context.Landmarks.Find(landmarkId);
				this.context.Remove(landmark);
				this.context.SaveChanges();
				return true;
			}
			catch (Exception e) {
				throw e;
			}
		}
	}
}
