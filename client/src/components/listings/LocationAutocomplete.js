import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

// TODO: Add spinner

const LocationAutocomplete = ({ location, setLocation }) => {
  // Exclude businesses and points of interest
  const searchOptions = {
    types: ['geocode'],
  };

  return (
    <div className='location-autocomplete my-10'>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={setLocation}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {/* As per documentation, an input which gets its props from getInputProps function needs to be included and it's also possible to pass in additional proprs to that function, like placeholder */}
            <input
              {...getInputProps({
                placeholder: 'Enter a city...',
                id: 'location',
                className:
                  'w-full md:max-w-md p-2 bg-accent-100 text-gray-900 font-medium placeholder-gray-500 shadow rounded-md border-2 border-transparent focus:bg-white focus:outline-none focus:border-accent-400',
              })}
            />

            <div className='block w-full'>
              {loading ? <div>...loading</div> : null}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#667eea' : '#ebf4ff',
                  color: suggestion.active ? '#fff' : '#26282c',
                };

                const className =
                  'w-full md:max-w-md p-2 first:border-0 first:rounded-t-md first:mt-5 last:rounded-b-md border-t border-gray-200 text-gray-800 font-medium cursor-pointer';

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
};

export default LocationAutocomplete;
