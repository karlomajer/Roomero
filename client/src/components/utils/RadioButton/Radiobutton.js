import React from 'react';
import PropTypes from 'prop-types';
import RadiobuttonItem from './RadiobuttonItem';

const Radiobutton = ({ className, values, selectedItem, setSelectedItem }) => {
  const handleChange = e => {
    setSelectedItem({ [e.target.dataset?.label]: e.target.checked });
  };

  return (
    <div className={className}>
      {values.map(item => (
        <div key={item.key}>
          <RadiobuttonItem
            id={item.key}
            name={item.name}
            dataLabel={item.label}
            checked={selectedItem[item.label]}
            onChange={handleChange}
          />{' '}
          <label htmlFor={item.key}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

Radiobutton.propTypes = {
  className: PropTypes.string,
  values: PropTypes.array.isRequired,
  selectedItem: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired
};

export default Radiobutton;
