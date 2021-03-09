import React from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';
import './input.css';

const LocationAutocomplete = ({ location, setLocation, getListings }) => {
  // Exclude businesses and points of interest
  const searchOptions = {
    types: ['geocode'],
  };

  function handleKeyDown(e) {
    e.key === 'Enter' && getListings(location.replace(/ /g, '%20'));
  }

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
            <div className='input-container flex bg-secondary-300 rounded-md shadow'>
              <input
                {...getInputProps({
                  placeholder: 'Enter a city...',
                  id: 'location',
                  className:
                    'flex-grow w-full md:max-w-md p-2 font-medium bg-secondary-300 rounded-tl-md rounded-bl-md focus:outline-none',
                })}
                onKeyDown={handleKeyDown}
              />
              <button
                className='bg-accent-500 transition-colors duration-200 hover:bg-accent-400 items-center rounded-md cursor-pointer focus:outline-none'
                style={{ margin: '0.3rem', padding: '0.45rem 0.75rem' }}
                onClick={() => getListings(location.replace(/ /g, '%20'))}
              >
                <i className='fa fa-search' aria-hidden='true' />
              </button>
            </div>

            <div className='block w-full'>
              {suggestions.map((suggestion, index) => {
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
                    key={index}
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
  getListings: PropTypes.func.isRequired,
};

export default LocationAutocomplete;
