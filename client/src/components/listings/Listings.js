import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getListings, clearListings } from '../../actions/listing';
import LocationAutocomplete from './LocationAutocomplete';
import ListingItem from './ListingItem';
import ReactPaginate from 'react-paginate';
import Spinner from '../utils/Spinner';

const Listings = ({
  getListings,
  clearListings,
  listing: { listings, loading },
}) => {
  // For Location Autocomplete
  const [location, setLocation] = useState('');

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [listingsPerPage] = useState(12);

  useEffect(() => {
    getListings();
    // Runs before leaving the page to clear state
    return () => clearListings();
  }, [getListings, clearListings]);

  useEffect(() => {
    // Add event listener for submitting location with enter key
    const listener = e => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.target.id === 'location' &&
          location &&
          getListings(location.replace(/ /g, '%20'));
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [getListings, location]);

  // Get current listings
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  // Make sure listings is not null before slicing
  const currentListings =
    listings && listings.slice(indexOfFirstListing, indexOfLastListing);

  const paginate = data => setCurrentPage(data.selected + 1);

  return (
    <div className='container page-wrap flex-grow max-w-screen-xl mx-auto mt-20 mb-4 px-4 sm:px-8 md:px-10'>
      {listings === null || loading ? (
        <Spinner className='pt-20' />
      ) : (
        <div className='bg-secondary-200 mt-10 px-6 md:px-10 py-6 rounded-md'>
          <h1 className='section-heading'>Find a place to stay</h1>
          <LocationAutocomplete location={location} setLocation={setLocation} />
          <div className='listings-grid'>
            {currentListings.map(listing => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          </div>
          {listings.length > 0 && (
            <ReactPaginate
              previousLabel={'\u00AB'}
              nextLabel={'\u00BB'}
              pageCount={Math.ceil(listings.length / listingsPerPage)}
              onPageChange={paginate}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              containerClassName={
                'flex justify-center items-center w-full md:max-w-xs mt-10 mx-auto py-3'
              }
              pageLinkClassName={
                'inline-block w-8 h-8 text-center px-3 py-1 rounded-full focus:outline-none focus:shadow-outline'
              }
              pageClassName={'mx-1'}
              activeClassName={'bg-accent-500 text-white rounded-full'}
              previousLinkClassName={
                'mr-2 p-2 focus:outline-none focus:shadow-outline'
              }
              nextLinkClassName={
                'ml-2 p-2 focus:outline-none focus:shadow-outline'
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

Listings.propTypes = {
  getListings: PropTypes.func.isRequired,
  clearListings: PropTypes.func.isRequired,
  listing: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  listing: state.listing,
});

export default connect(mapStateToProps, { getListings, clearListings })(
  Listings
);
