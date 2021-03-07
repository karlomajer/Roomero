import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

const LocationAutocomplete = ({ location, setLocation }) => {
  // Exclude businesses and points of interest
  const searchOptions = {
    types: ['geocode'],
  };

  return (
    <div className='flex w-full my-10' style={{ maxWidth: '450px' }}>
      <PlacesAutocomplete
        value={location}
        onChange={setLocation}
        onSelect={setLocation}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className='w-full'>
            {/* As per documentation, an input which gets its props from getInputProps function needs to be included and it's also possible to pass in additional proprs to that function, like placeholder */}
            <input
              {...getInputProps({
                placeholder: 'Enter a city...',
                id: 'location',
                className:
                  'w-full md:max-w-md p-2 bg-secondary-300 font-medium shadow rounded-md border-2 border-transparent focus:outline-none focus:border-accent-500',
              })}
            />

            <div className='block w-full'>
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#2a3059' : '#151a22',
                  color: suggestion.active ? '#fff' : '#d1d5db',
                };

                const className =
                  'w-full md:max-w-md p-2 first:border-0 first:rounded-t-md first:mt-5 last:rounded-b-md border-t border-secondary-100 font-medium cursor-pointer';

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
