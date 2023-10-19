import { Upload } from 'antd';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import CamIcon from '@/assets/images/icons/camera_icon.svg';
import { alertError } from '@/utils/notification';

import './styles.scss';

function ImageUpload({ url, account, setUrl }) {
  const [imageUrl, setImageUrl] = useState(url);
  const handleChange = (info) => {
    const urlUpload = URL.createObjectURL(info.file.originFileObj);
    setImageUrl(urlUpload);
    setUrl(info.file.originFileObj);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      alertError('IMAGE_FORMAT');
    }
    return isJpgOrPng || Upload.LIST_IGNORE;
  };

  const handleCustomRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const uploadButton = (
    <div className="upload-image-button">
      <div className="group-image-upload">
        <p className="group-image-text">{account?.firstName?.slice(0, 1)}</p>
        <img src={CamIcon} alt="upload" className="btn-upload-image" />
      </div>
    </div>
  );
  return (
    <div className="upload-image">
      <Upload
        listType="picture-card"
        onChange={handleChange}
        showUploadList={false}
        className="lead-upload-image upload-border-none"
        beforeUpload={beforeUpload}
        accept='.jpg, .png, .jpeg'
        customRequest={handleCustomRequest}
      >
        {imageUrl ? (
          <div className="group-image-upload">
            <img src={imageUrl} alt="avatar" className="upload-img" />
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
      <p className="upload-image-name">
        {account?.firstName} {account?.lastName}
      </p>
      {/* <p className="group-image-text">{account?.firstName?.slice(0,1)}</p> */}
    </div>
  );
}
ImageUpload.propTypes = {
  url: PropTypes.string,
  account: PropTypes.object,
  setUrl: PropTypes.func,
};

ImageUpload.defaultProps = {
  url: '',
};

export default ImageUpload;
