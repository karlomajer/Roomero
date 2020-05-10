import React from 'react';
import PropTypes from 'prop-types';

const CheckboxItem = ({
  type = 'checkbox',
  id,
  name,
  dataLabel,
  checked = false,
  onChange
}) => (
  <input
    type={type}
    id={id}
    name={name}
    data-label={dataLabel}
    checked={checked}
    onChange={onChange}
  />
);

CheckboxItem.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  dataLabel: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default CheckboxItem;
