import React from 'react';

const Footer = props => {
  return (
    <div
      style={{ paddingBottom: '20px', height: '40px' }}
      className='font-medium text-center'
    >
      {'\u00A9'} {new Date().getFullYear()} Roomero, Inc. All rights reserved
    </div>
  );
};

export default Footer;
