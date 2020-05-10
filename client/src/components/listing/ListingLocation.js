import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import marker from '../../img/map-marker-accent.png';

const Marker = () => (
  <div
    style={{
      width: '40px',
      height: '48px',
      content: `url(${marker})`,
      transform: 'translate(-32%, -85%)'
    }}
  />
);

const mobile = window.matchMedia('(max-width: 767px)');
const ListingLocation = ({ coordinates }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Location</h2>
      <div
        style={{ height: mobile.matches ? '20rem' : '30rem', width: '100%' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD0tVdxFEFfJeoiqeXWOqvitP487LRhph8' }}
          defaultCenter={coordinates}
          defaultZoom={15}
        >
          <Marker lat={coordinates.lat} lng={coordinates.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

ListingLocation.propTypes = {
  coordinates: PropTypes.object.isRequired
};

export default ListingLocation;
