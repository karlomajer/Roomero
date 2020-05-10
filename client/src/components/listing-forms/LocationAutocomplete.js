import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// TODO: Add spinner

const LocationAutocomplete = ({ location, setLocation, setCoordinates }) => {
  const searchOptions = {
    types: ['address'],
  };

  const handleSelect = async address => {
    setLocation(address);
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
  };

  return (
    <div className='location-autocomplete'>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={address => handleSelect(address)}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='form-group flex-wrap'>
            {/* As per documentation, an input which gets its props from getInputProps function needs to be included and it's also possible to pass in additional proprs to that function, like placeholder */}
            <input
              {...getInputProps({
                placeholder: 'Address',
                id: 'location',
                className: 'input input-half',
              })}
            />

            <label htmlFor='location' className='input-label'>
              Address *
            </label>

            <div className='block w-full md:ml-40'>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#667eea' : '#ebf4ff',
                  color: suggestion.active ? '#fff' : '#26282c',
                };

                const className =
                  'w-full md:w-1/2 p-2 first:border-0 first:rounded-t-md first:mt-4 last:rounded-b-md border-t border-gray-200 text-gray-800 font-medium cursor-pointer';

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      style,
                      className,
                    })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

LocationAutocomplete.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  setCoordinates: PropTypes.func.isRequired,
};

export default LocationAutocomplete;
