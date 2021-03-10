const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { sanitize, check, validationResult } = require('express-validator');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const Listing = require('../../models/Listing');
const Reservation = require('../../models/Reservation');
const Profile = require('../../models/Profile');

// @route    POST api/listings
// @desc     Create a listing
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('propertyType', 'Property type is required').not().isEmpty(),
      check('location', 'Address is required').not().isEmpty(),
      check('images', 'At least one image is required').not().isEmpty(),
      check('maxGuests', 'Max guests is required').isNumeric({
        no_symbols: false,
      }),
      check('bathroomCount', 'Bathroom count is required').isNumeric({
        no_symbols: false,
      }),
      check('pricePerNight', 'Price per night is required').isNumeric({
        no_symbols: false,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newListing = new Listing({
        owner: req.profile.id,
        title: req.body.title,
        propertyType: req.body.propertyType,
        location: req.body.location,
        coordinates: req.body.coordinates,
        maxGuests: req.body.maxGuests,
        bathroomCount: req.body.bathroomCount,
        description: req.body.description,
        amenities: req.body.amenities,
        pricePerNight: req.body.pricePerNight,
        images: req.body.images,
      });

      const listing = await newListing.save();
      res.json(listing);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    Get api/listings
// @desc     Get all listings
// @access   Private
router.get('/', async (req, res) => {
  try {
    if (req.query.location) {
      const locationInfo = req.query.location.split(', ');

      const listings = await Listing.find({
        location: { $all: locationInfo },
      }).sort({ date: -1 });
      res.json(listings);
    } else {
      const listings = await Listing.find().sort({ date: -1 });
      res.json(listings);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    Get api/listings/recent
// @desc     Get last 50 listings
// @access   Private
router.get('/recent', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ date: -1 }).limit(50);
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/listings/me
// @desc     Get current user's listings
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.profile.id });

    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/listings/:id
// @desc     Get listing by id
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('owner', ['name', 'avatar'])
      .populate({
        path: 'reservations',
        populate: {
          path: 'owner guest',
        },
      });

    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.json(listing);
  } catch (err) {
    console.error(err.message);

    // If error kind is equal to ObjectId it means that the give ID has incorrect format (invalid length for example, id of 21 instead of the usual 24 length ID)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/listings/:id
// @desc     Delete listing by id
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    // toString has to be used because listing.owner is an ObjectID while req.profile.id is an ID as a string
    if (listing.owner.toString() !== req.profile.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await listing.deleteOne();

    res.json({ msg: 'Listing removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    PUT api/listings/reservation/:id
// @desc     Add reservation to a listing
// @access   Private
router.put(
  '/reservation/:id',
  [
    auth,
    [
      check('startDate', 'Check-in date is required').not().isEmpty(),
      sanitize('endDate').toDate(),
      check('startDate')
        .toDate()
        .custom((startDate, { req }) => {
          if (startDate.getTime() > req.body.endDate.getTime()) {
            throw new Error('Check-in date must be before check-out date');
          }
          if (startDate.getTime() === req.body.endDate.getTime()) {
            throw new Error(
              'Check-in date and check-out date cannot be the same'
            );
          }
          if (startDate.getTime() < Date.now()) {
            throw new Error('You cannot reserve dates that are in the past');
          }
          return startDate;
        }),
      check('endDate', 'Check-out date is required').not().isEmpty(),
      check('numberOfGuests', 'Number of guests is required').isNumeric({
        no_symbols: false,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { owner, startDate, endDate, numberOfGuests } = req.body;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    const dayLengthInMiliseconds = 86400000;
    const daysReserved = Math.floor(
      (endDateObj - startDateObj) / dayLengthInMiliseconds
    );

    try {
      const listing = await Listing.findById(req.params.id).populate(
        'reservations'
      );

      if (!listing) {
        return res.status(404).json({ msg: 'Listing not found' });
      }

      const profile = await Profile.findOne({ user: req.user.id });

      // Check if reservation overlaps with other reservations
      const reservationRange = moment.range(startDateObj, endDateObj);
      const reservationOverlaps = listing.reservations.some(
        existingReservartion => {
          const existingRange = moment.range(
            new Date(existingReservartion.startDate),
            new Date(existingReservartion.endDate)
          );
          return reservationRange.overlaps(existingRange, {
            adjacent: true,
          });
        }
      );

      if (reservationOverlaps) {
        return res.status(400).json({
          msg: 'Reservation cannot overlap with existing reservations',
        });
      }

      if (numberOfGuests > listing.maxGuests) {
        return res.status(400).json({
          msg: 'Number of guests cannot exceed the maximum amount',
        });
      }

      // Calculate total price based on reservation date (5 is hardcoded service fee)
      newReservation = new Reservation({
        owner,
        guest: req.profile.id,
        listing: req.params.id,
        startDate,
        endDate,
        numberOfGuests,
        totalPrice: listing.pricePerNight * daysReserved + 5,
      });
      reservation = await newReservation.save();

      listing.reservations.push(newReservation._id);
      profile.reservations.push(newReservation._id);
      await listing.save();
      await profile.save();

      res.json(reservation);
    } catch (err) {
      console.error(err.message);

      // If error kind is equal to ObjectId it means that the give ID has incorrect format (invalid length for example, id of 21 instead of the usual 24 length ID)
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Listing not found' });
      }

      res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    DELETE api/listings/reservation/:id
// @desc     Delete reservation from a listing
// @access   Private
router.delete('/reservation/:id', auth, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ msg: 'Reservation not found' });
    }

    if (
      reservation.owner.toString() !== req.profile.id &&
      reservation.guest.toString() !== req.profile.id
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await reservation.deleteOne();
    res.json({ msg: 'Reservation deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/listings/reservation/me
// @desc     Get current user's reservations
// @access   Private
router.get('/reservation/me', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({
      guest: req.profile.id,
    }).populate('owner listing', [
      'avatar',
      'name',
      '_id',
      'title',
      'location',
      'images',
    ]);
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route    GET api/listings/:id/reservation
// @desc     Get listing reservations
// @access   Private
router.get('/:id/reservation', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate({
      path: 'reservations',
      populate: {
        path: 'guest listing',
      },
    });

    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    if (listing.owner.toString() !== req.profile.id) {
      return res.status(401).json({
        msg: 'You are not authorized to view reservations of this listing',
      });
    }

    res.json(listing.reservations);
  } catch (err) {
    console.error(err.message);

    // If error kind is equal to ObjectId it means that the give ID has incorrect format (invalid length for example, id of 21 instead of the usual 24 length ID)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
