import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const FileUpload = ({
  uploadLocation,
  files,
  setFiles,
  setUploadData,
  multiple,
  required,
}) => {
  const onChange = e => {
    setFiles([...e.target.files]);
    console.log(e.target.files);
  };

  useEffect(() => {
    files.length > 0 && onSubmit();
  }, [files]);

  const onSubmit = async () => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post(
        `/api/upload/${uploadLocation}`,
        formData,
        config
      );

      // After receiving the response, we get back the uploaded file so we set it into state if we plan to use it
      const { fileNames, filePaths } = res.data;
      setUploadData({ fileNames, filePaths });
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
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
  uploadLocation: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  setUploadData: PropTypes.func.isRequired,
  multiple: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
};

export default FileUpload;
