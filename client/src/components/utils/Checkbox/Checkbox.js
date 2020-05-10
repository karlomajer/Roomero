import React from 'react';
import CheckboxItem from './CheckboxItem';
import PropTypes from 'prop-types';

const Checkbox = ({ className, values, checkedItems, setCheckedItems }) => {
  const handleChange = e => {
    setCheckedItems({
      ...checkedItems,
      [e.target.dataset?.label]: e.target.checked
    });
  };

  return (
    <div className={className}>
      {values.map(item => (
        <div key={item.key}>
          <CheckboxItem
            id={item.key}
            name={item.name}
            dataLabel={item.label}
            checked={checkedItems[item.label]}
            onChange={handleChange}
          />{' '}
          <label htmlFor={item.key}>{item.label}</label>
        </div>
      ))}
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  values: PropTypes.array.isRequired,
  checkedItems: PropTypes.object.isRequired,
  setCheckedItems: PropTypes.func.isRequired
};

export default Checkbox;
