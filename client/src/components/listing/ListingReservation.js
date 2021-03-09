import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import './react_dates_override.css';
import InputNumber from 'rc-input-number';
import 'rc-input-number/assets/index.css';
import './rc_input_number_override.css';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { addReservation } from '../../actions/listing';

const moment = extendMoment(Moment);

const ListingReservation = ({
  owner,
  listingId,
  pricePerNight,
  reservations,
  maxGuests,
  addReservation,
  history,
}) => {
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const { startDate, endDate } = dateRange;

  const [nightsSelected, setNightsSelected] = useState();

  const [focus, setFocus] = useState(null);

  const [blockedDays, setBlockedDays] = useState([]);

  const [blockDaysAfter, setBlockDaysAfter] = useState({});

  const [numberOfGuests, setNumberOfGuests] = useState(1);

  // Find all reserved dates
  useEffect(() => {
    let days = [];
    reservations.forEach(reservation => {
      const range = moment.range(reservation.startDate, reservation.endDate);
      days = [...days, ...Array.from(range.by('days'))];
    });
    setBlockedDays([...blockedDays, ...days]);
  }, [reservations]);

  // Find first blocked date compared to startDate
  useEffect(() => {
    if (startDate) {
      const datesAfterStart = blockedDays.filter(
        day => day > startDate.toDate()
      );
      setBlockDaysAfter(new Date(Math.min.apply(null, datesAfterStart)));
    }
  }, [startDate]);

  const mobile = window.matchMedia('(max-width: 767px)');

  const handleDayBlock = day =>
    blockedDays.some(blockedDay => day.isSame(blockedDay, 'day')) ||
    day.toDate() < Date.now();

  const handleOutsideRange = day => startDate && day.toDate() >= blockDaysAfter;

  const submitReservation = e => {
    !startDate && setFocus('startDate');
    startDate && !endDate && setFocus('endDate');
    e.target.blur(); // Remove focus from button
    startDate &&
      endDate &&
      numberOfGuests &&
      addReservation(
        { owner, listing: listingId, startDate, endDate, numberOfGuests },
        history
      );
  };

  return (
    <div className='my-4 -mx-4 sm:mx-0 md:mt-3 p-6 bg-secondary-300 rounded-md'>
      <h2 className='text-lg font-semibold pb-3 md:border-b md:border-secondary-100 '>
        Add dates for prices
      </h2>
      <div className='font-semibold text-sm md:pt-3'>Dates</div>
      <DateRangePicker
        startDate={startDate}
        startDateId='startDate'
        endDate={endDate}
        endDateId='endDate'
        onDatesChange={({ startDate, endDate }) => {
          setDateRange({ startDate, endDate });
          startDate &&
            endDate &&
            setNightsSelected(endDate.diff(startDate, 'days'));
        }}
        focusedInput={focus}
        onFocusChange={focus => setFocus(focus)}
        showClearDates={true}
        numberOfMonths={1}
        withFullScreenPortal={mobile.matches ? true : false}
        isDayBlocked={day => handleDayBlock(day)}
        isOutsideRange={day => handleOutsideRange(day)}
      />
      <div className='font-semibold text-sm mt-4'>Guests</div>
      <InputNumber
        aria-label='Max guests'
        min={1}
        max={maxGuests}
        value={numberOfGuests}
        onChange={val =>
          numberOfGuests < 1
            ? setNumberOfGuests(1)
            : setNumberOfGuests(Number(val.toString().replace(/\D/g, '')))
        }
        formatter={val => val.toString().replace(/\D/g, '')}
      />
      {startDate && endDate && (
        <div className='mt-5' style={{ fontSize: '0.925rem' }}>
          <div className='flex justify-between text-gray-400'>
            <span>
              {pricePerNight} € x {nightsSelected} nights
            </span>
            <span>{pricePerNight * nightsSelected} €</span>
          </div>
          <div className='section-line my-2' />
          <div className='flex justify-between text-gray-400'>
            <span>Service fee</span>
            <span>5 €</span> {/* Hardcoded service fee */}
          </div>
          <div className='section-line my-2' />
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>{pricePerNight * nightsSelected + 5} €</span>
          </div>
        </div>
      )}
      <button
        onClick={e => submitReservation(e)}
        className='btn btn-primary block w-full mt-8'
      >
        {startDate && endDate ? 'Reserve' : 'Check Availability'}
      </button>
    </div>
  );
};

ListingReservation.propTypes = {
  owner: PropTypes.object.isRequired,
  listingId: PropTypes.string.isRequired,
  pricePerNight: PropTypes.number.isRequired,
  reservations: PropTypes.array.isRequired,
  maxGuests: PropTypes.number.isRequired,
  addReservation: PropTypes.func.isRequired,
};

export default connect(null, { addReservation })(
  withRouter(ListingReservation)
);
