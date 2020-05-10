const mongoose = require('mongoose');
const Profile = require('./Profile');
const Reservation = require('./Reservation');

const ListingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  title: {
    type: String,
    required: true
  },
  propertyType: {
    type: String,
    required: true
  },
  location: {
    type: [String],
    required: true
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  maxGuests: {
    type: Number,
    required: true
  },
  bathroomCount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  amenities: {
    type: [String]
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  images: {
    type: [String]
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reservation'
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  }
});

ListingSchema.pre('deleteOne', { document: true }, function(next) {
  Reservation.deleteMany({ _id: { $in: this.reservations } }).exec();
  Profile.updateMany(
    {},
    {
      $pull: {
        reservations: { $in: this.reservations }
      }
    },
    { multi: true }
  ).exec();
  next();
});

module.exports = Listing = mongoose.model('listing', ListingSchema);
