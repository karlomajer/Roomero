const mongoose = require('mongoose');
const { Listing } = require('./Listing');
const Profile = require('./Profile');

const ReservationSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profile'
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'listing'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  numberOfGuests: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ReservationSchema.pre('deleteOne', { document: true }, function(next) {
  mongoose
    .model('profile')
    .updateOne(
      { _id: this.guest },
      {
        $pull: {
          reservations: this._id
        }
      },
      { multi: true }
    )
    .exec();
  mongoose
    .model('listing')
    .updateOne(
      { _id: this.listing },
      {
        $pull: {
          reservations: this._id
        }
      },
      { multi: true }
    )
    .exec();
  next();
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);
