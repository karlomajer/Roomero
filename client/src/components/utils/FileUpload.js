import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FileUpload = ({
  files,
  setFiles,
  setUploadData,
  setLoading,
  multiple,
  required,
}) => {
  const onChange = e => {
    setFiles([...e.target.files]);
  };

  useEffect(() => {
    if (files.length > 0) {
      setLoading(true);
      onSubmit();
    }
  }, [files]);

  const onSubmit = async () => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    setUploadData([]);

    await Promise.all(
      files.map(async file => {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const res = await axios.post('/api/upload', formData, config);

          const { imageUrl } = res.data;
          setUploadData(uploadData => [...uploadData, imageUrl]);
        } catch (err) {
          console.log(err);
          if (err.response.status === 500) {
            console.log('There was a problem with the server');
          } else {
            console.log(err.response.data.msg);
          }
        }
      })
    );

    setLoading(false);
  };

  return (
    <Fragment>
      <input
        type='file'
        id='fileUpload'
        onChange={e => onChange(e)}
        accept='image/*'
        multiple={multiple}
        required={required}
      />
      <div className='flex-break' />
    </Fragment>
  );
};

FileUpload.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  setUploadData: PropTypes.func.isRequired,
  setLoading: PropTypes.func,
  multiple: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
};

export default FileUpload;
