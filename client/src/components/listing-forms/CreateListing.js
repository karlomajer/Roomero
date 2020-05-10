import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createListing } from '../../actions/listing';
import Checkbox from '../utils/Checkbox/Checkbox';
import { amenitiesValues } from '../utils/Checkbox/checkboxValues';
import Radiobutton from '../utils/RadioButton/Radiobutton';
import { propertyTypeValues } from '../utils/RadioButton/radiobuttonValues';
import FileUpload from '../utils/FileUpload';
import LocationAutocomplete from './LocationAutocomplete';

const CreateListing = ({ createListing, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    propertyType: '',
    address: '',
    maxGuests: '',
    bathroomCount: '',
    amenities: [],
    pricePerNight: '',
    description: '',
    images: [],
  });

  const {
    title,
    maxGuests,
    bathroomCount,
    pricePerNight,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const _formData = {
      ...formData,
      propertyType: Object.keys(selectedPropertyType)[0],
      location: location.split(', '),
      coordinates,
      amenities: Object.keys(checkedAmenities).filter(
        (amenity) => checkedAmenities[amenity] === true
      ),
      images: uploadData.filePaths,
    };
    createListing(_formData, history);
  };

  // For Property Type Radiobuttons
  const [selectedPropertyType, setSelectedPropertyType] = useState({});

  // For Amenities Checkboxes
  const [checkedAmenities, setCheckedAmenities] = useState({});

  // For Location Autocomplete
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  // For FileUpload
  const [files, setFiles] = useState([]);
  const [uploadData, setUploadData] = useState({});

  return (
    <div className='container page-wrap max-w-screen-lg mx-auto my-20 px-8 md:py-4'>
      <h2 className='section-heading'>Create a new listing</h2>
      <form className='my-10' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            id='title'
            name='title'
            value={title}
            onChange={onChange}
            className='input input-half'
            type='text'
            placeholder='Title'
            required
          />
          <label htmlFor='title' className='input-label'>
            Title *
          </label>
        </div>
        <div className='form-group'>
          <Radiobutton
            className={'w-full checkbox-grid md:w-auto'}
            values={propertyTypeValues}
            selectedItem={selectedPropertyType}
            setSelectedItem={setSelectedPropertyType}
          />
          <label className='input-label'>Type *</label>
        </div>
        <LocationAutocomplete
          location={location}
          setLocation={setLocation}
          setCoordinates={setCoordinates}
        />
        <div className='form-group'>
          <input
            id='maxGuests'
            name='maxGuests'
            value={maxGuests}
            onChange={onChange}
            className='input input-half'
            type='number'
            placeholder='Max guests'
            required
          />
          <label htmlFor='maxGuests' className='input-label'>
            Max guests *
          </label>
        </div>
        <div className='form-group'>
          <input
            id='bathroomCount'
            name='bathroomCount'
            value={bathroomCount}
            onChange={onChange}
            className='input input-half'
            type='number'
            placeholder='Bathroom count'
            required
          />
          <label htmlFor='bathroomCount' className='input-label'>
            Bathrooms *
          </label>
        </div>
        <div className='form-group'>
          <Checkbox
            className='w-full checkbox-grid md:w-auto'
            values={amenitiesValues}
            checkedItems={checkedAmenities}
            setCheckedItems={setCheckedAmenities}
          />
          <label className='input-label'>Amenities</label>
        </div>
        <div className='form-group'>
          <input
            id='pricePerNight'
            name='pricePerNight'
            value={pricePerNight}
            onChange={onChange}
            className='input input-half'
            type='number'
            placeholder='Price per night (€)'
            required
          />
          <label htmlFor='pricePerNight' className='input-label'>
            Price / night (€) *
          </label>
        </div>
        <div className='form-group'>
          <textarea
            id='description'
            name='description'
            value={description}
            onChange={onChange}
            className='input input-full'
            placeholder='Description'
            rows='3'
          />
          <label htmlFor='description' className='input-label'>
            Description
          </label>
        </div>
        <div className='form-group flex-wrap'>
          <FileUpload
            uploadLocation={'listings'}
            files={files}
            setFiles={setFiles}
            setUploadData={setUploadData}
            multiple={true}
            required={true}
          />
          <label className='input-label'>Property images *</label>
        </div>
        <input
          type='submit'
          className='btn btn-primary my-5 w-full md:w-auto'
          value='Submit listing'
        />
      </form>
    </div>
  );
};

CreateListing.propTypes = {
  createListing: PropTypes.func.isRequired,
};

export default connect(null, { createListing })(withRouter(CreateListing));
